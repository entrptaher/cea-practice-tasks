// Dependencies
const fs = require("fs");
const formatJSON = require('./proposed-format.js')

// Get data from input/raw.txt
const contents = fs.readFileSync("input/raw.txt")
				   .toString()
				   .split("\n");

// Global variables
let name = [],
	number = 1,
	rootDir = "output",
	dir1 = "instance", 
	dir2 = "content", 
	dir3 = "deeplink-status";

// Root Function
function root() {
	for(let i = 0; i < contents.length; i++) {
		console.log(i)
		// convert each data into json
		let content = JSON.parse(contents[i]);
		// get the file name
		let fileName = getFileName(content.title, content).toLowerCase();
		console.log(name)
		// check if there is any duplicate file name
		if(name.includes(fileName) === false) {
			name.push(fileName);
			// check if our expected file structure is done or not
			if(outputFolderExist() && childFolderExist()) {
				saveIntoInstance(contents[i], fileName);
				saveIntoContent(contents[i], fileName);
				saveIntoDeeplinkStatus(contents[i], fileName);
				// set back to the number value to 1
				number = 1;
			}
		} else {
			// check if our expected file structure is done or not
			if(outputFolderExist() && childFolderExist()) {
				saveIntoInstance(contents[i], fileName, number);
				saveIntoContent(contents[i], fileName, number);
				saveIntoDeeplinkStatus(contents[i], fileName, number);
				// check if there is 2 or more same named file or not
				if(name.filter(item => item == fileName).length > 1) {
					// incriment the number value
					number++;
				} else {
					// reset it into it's default
					number = 1;
				}
			}
		}
		// breaking the loop when its done
		if(i === contents.length - 1) {
			break;
		}
	}
}

// Formating filename and return expected file name format
const getFileName = (name, content) => {
	if(content.title === name && name !== undefined) {
		return name.replace(/[&\/\\#,+()$~%\-\\|\\—\'":*?<>{}]/g, '').split(' ').join("-").replace(/--/g, '-').replace(/Ð/g, "ð-");
	}
}

// check if output folder already exsist or not
const outputFolderExist = () => {
	if(fs.existsSync("./output")) {
		return true;
	} else {
		// if not then create new forlder named "output"
		fs.mkdirSync("./output");
		return true;
	}
}

// check if child folder already exsist or not
const childFolderExist = () => {
	if(fs.existsSync(`./output/${dir1}`) && fs.existsSync(`./output/${dir2}`) && fs.existsSync(`./output/${dir3}`)) {
		return true;
	} else {
		// if not then create new forlder named dir1
		fs.mkdirSync(`./output/${dir1}`);
		// if not then create new forlder named dir2
		fs.mkdirSync(`./output/${dir2}`);
		// if not then create new forlder named dir3
		fs.mkdirSync(`./output/${dir3}`);
		return true;
	}
}

// Save json file into instance folder
const saveIntoInstance = (content, fileName, number = 0) => {
	// Formated output json as proposed format
	const formatedFile = formatJSON(JSON.parse(content), "instance")
	// check if there was any duplicate named file
	if(number === 0) {
		fs.writeFile(`./output/instance/${fileName}.json`, JSON.stringify(formatedFile), (err) => {
			if (err) throw err;
		});
	} else {
		// if yes then add the number value after main file name
		fs.writeFile(`./output/instance/${fileName}-${number}.json`, JSON.stringify(formatedFile), (err) => {
			if (err) throw err;
		})
	}
}

// Save json file into content folder
const saveIntoContent = (content, fileName, number = 0) => {
	// Formated output json as proposed format
	const formatedFile = formatJSON(JSON.parse(content), "content")
	// check if there was any duplicate named file
	if(number === 0) {
		fs.writeFile(`./output/content/${fileName}.json`, JSON.stringify(formatedFile), (err) => {
			if (err) throw err;
		});
	} else {
		// if yes then add the number value after main file name
		fs.writeFile(`./output/content/${fileName}-${number}.json`, JSON.stringify(formatedFile), (err) => {
			if (err) throw err;
		})
	}
}

// Save json file into deeplink-status folder
const saveIntoDeeplinkStatus = (content, fileName, number = 0) => {
	// Formated output json as proposed format
	const formatedFile = formatJSON(JSON.parse(content), "deeplink-status")
	// check if there was any duplicate named file
	if(number === 0) {
		fs.writeFile(`./output/deeplink-status/${fileName}.json`, JSON.stringify(formatedFile), (err) => {
			if (err) throw err;
		});
	} else {
		// if yes then add the number value after main file name
		fs.writeFile(`./output/deeplink-status/${fileName}-${number}.json`, JSON.stringify(formatedFile), (err) => {
			if (err) throw err;
		});
	}
}

root();