const fs = require('fs');
const path = require('path');

const inputDir = path.resolve(`${__dirname}/../input`);
const outputDir = path.resolve(`${__dirname}/../output`);

// reads the input file line by line
const lineReader = require('readline').createInterface({
  input: fs.createReadStream(`${inputDir}/raw.txt`),
});
const cleaner = require('./cleaner');

const baseJSON = [];
// asynchronously processes all lines
lineReader.on('line', (line) => {
  console.log('Current Input', baseJSON.length);
  // cleanup and format data properly
  // Every line is a JSON object exported from mongoDB
  const newData = cleaner(JSON.parse(line));
  // save the data
  baseJSON.push(newData);
});
lineReader.on('close', () => {
  console.log('Total Processed', baseJSON.length);
  // write on disk only after all lines are processed
  fs.writeFileSync(`${outputDir}/output.json`, JSON.stringify(baseJSON, true, 2));
});
