// Dependencies
const fs = require("fs");

// Get data from input/raw.txt
const contents = fs.readFileSync("input/raw.txt")
				   .toString()
				   .split("\n");

// Global variables
let name = [], 
	number = 1,
	rootDir = "output",
	dirs = ["instance", "content", "deeplink-status"];

// Root Function
function root() {
	for(let i = 0; i < contents.length; i++) {
		// Escaping 5th JSON Data Because of getting error
		if (i !== 4) {
			// convert each data into json and get the expected filename from it
			let content = JSON.parse(contents[i]), fileName = getFileName(content._id["$oid"], content);
			// check if there is any duplicate file name
			if(!name.includes(fileName)) {
				// If not then push the filename into name array
				name.push(fileName);
				// check if our expected file structure is done or not
				if(outputFolderExist() && childFolderExist()) {
					saveFileToFolder(contents[i], fileName, dirs);
					// set back to the number value to 1
					number = 1;
				}
			} else {
				// check if our expected file structure is done or not
				if(outputFolderExist() && childFolderExist()) {
					saveFileToFolder(contents[i], fileName, dirs, number);
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
		}
		// breaking the loop when its done
		if(i === contents.length - 1) {
			break;
		}
	}
}

// Formating filename and return expected file name format
const getFileName = (name, content) => {
	// check if user need the filename into it's title
	if(content.title === name && name !== undefined) {
		// Formating filename from title
		let x = name.replace(/[&\/\\#,+()$~%\-\\|\\—\'":*?<>{}]/g, '').split(' ').join("-").replace(/--/g, '-').replace(/Ð/g, "ð-");
		// returning filename into lowercase
		return x.toLowerCase();
	} 
	// check if user need the filename into it's id
	else if(content._id["$oid"] === name && name !== undefined) {
		// returning filename into lowercase
		return name.toLowerCase();
	}
}

// check if output folder already exsist or not
const outputFolderExist = () => {
	if(!fs.existsSync("./output")) {
		fs.mkdirSync("./output");
		return true;
	}
	return true;
}

// check if child folder already exsist or not
const childFolderExist = () => {
	dirs.map((el, i) => {
		if(!fs.existsSync(`./output/${el}`)) {
			fs.mkdirSync(`./output/${el}`);
		}
	});
	return true;
}

// Save json file into instance folder
const saveFileToFolder = (content, fileName, location, number = 0) => {
	// check if there was any duplicate named file
	if(number === 0) {
		location.map((el, i) => {
			fs.writeFile(`./output/${el}/${fileName}.json`, content, (err) => {
				if (err) throw err;
			});
		});
	} else {
		// if yes then add the number value after main file name
		location.map((el, i) => {
			fs.writeFile(`./output/${el}/${fileName}-${number}.json`, content, (err) => {
				if (err) throw err;
			});
		});
	}
}

root();