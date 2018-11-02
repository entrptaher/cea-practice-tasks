const fs = require('fs');
const path = require('path');

const inputDir = path.resolve(`${__dirname}/../input`);
const outputDir = path.resolve(`${__dirname}/../output`);
const lineReader = require('readline').createInterface({
  input: fs.createReadStream(`${inputDir}/raw.txt`),
});
const cleaner = require('./cleaner');

const baseJSON = [];
lineReader.on('line', (line) => {
  console.log('Current Input', baseJSON.length);
  const newData = cleaner(JSON.parse(line));
  baseJSON.push(newData);
});
lineReader.on('close', () => {
  console.log('Total Processed', baseJSON.length);
  fs.writeFileSync(`${inputDir}/output.json`, JSON.stringify(baseJSON, true, 2));
});
