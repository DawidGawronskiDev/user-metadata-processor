const fs = require("fs");

const splitLines = require("./utils/splitLines");
const filterLines = require("./utils/filterLines");
const createUsers = require("./utils/createUsers");
const sortUsers = require("./utils/sortUsers");
const createOutput = require("./utils/createOutput");

const [inputFileName] = process.argv.slice(2);

if (!inputFileName) {
  console.error("Please provide an input file name.");
  process.exit(1);
}

const outputFileName = inputFileName.replace(/\.txt$/, "_output.json");

fs.readFile(inputFileName, "utf-8", (err, data) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  try {
    const splittedLines = splitLines(data);
    const filteredLines = filterLines(splittedLines);
    const users = createUsers(filteredLines);
    const sortedUsers = sortUsers(users);

    createOutput(sortedUsers, outputFileName);
  } catch (error) {
    console.error("Error processing data:", error);
    process.exit(1);
  }
});
