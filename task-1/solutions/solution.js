const fs = require('fs');
const path = require('path');

const inputDir = path.resolve(`${__dirname}/../input`);
const outputDir = path.resolve(`${__dirname}/../output`);

// reads the input file line by line
const lineReader = require('readline').createInterface({
  input: fs.createReadStream(`${inputDir}/raw.txt`),
});
const cleaner = require('./cleaner');

// asynchronously processes all lines
lineReader.on('line', (line) => {
  // cleanup and format data properly
  // Every line is a JSON object exported from mongoDB
  const newData = cleaner(JSON.parse(line));
  console.log(`Processing, ${newData.uuid}`)
  // save the data
  fs.writeFileSync(`${outputDir}/${newData.uuid}.json`, JSON.stringify(newData, true, 2));
});
