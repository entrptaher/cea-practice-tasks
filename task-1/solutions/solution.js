const fs = require('fs');
const path = require('path');
const GenerateSchema = require('generate-schema');

const inputDir = path.resolve(`${__dirname}/../input`);
const schemaDir = path.resolve(`${__dirname}/../schema`);
const outputDir = path.resolve(`${__dirname}/../output`);

// reads the input file line by line
const lineReader = require('readline').createInterface({
  input: fs.createReadStream(`${inputDir}/instances.json`),
});
const cleaner = require('./cleaner');

const schemas = [];
// asynchronously processes all lines
lineReader.on('line', (line) => {
  // cleanup and format data properly
  // Every line is a JSON object exported from mongoDB
  const newData = cleaner(JSON.parse(line));
  const newSchema = GenerateSchema.mongoose(newData);
  schemas.push(newSchema);
  console.log(`Processing, ${newData.uuid}`);
  // save the data
  fs.writeFileSync(`${schemaDir}/${newData.uuid}.json`, JSON.stringify(newSchema, true, 2));
  fs.writeFileSync(`${outputDir}/${newData.uuid}.json`, JSON.stringify(newData, true, 2));
});

lineReader.on('close', () => {
  console.log(schemas.length);
  const resultObject = schemas.reduce((result, currentObject) => {
    for (const key in currentObject) {
      if (currentObject.hasOwnProperty(key)) {
        result[key] = currentObject[key];
      }
    }
    return result;
  }, {});
  fs.writeFileSync(`${schemaDir}/schema.json`, JSON.stringify(resultObject, true, 2));
});
