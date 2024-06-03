# User Metadata Processor
This Node.js script processes a text file containing user metadata, filters relevant data, organizes it into a structured JSON format, and writes the output to a specified JSON file.

## Prerequisites
Node.js installed on your machine.
A keys module (located in ./lib/keys) that exports an array of keys to filter the metadata.
An input text file containing user metadata in a specific format.

### Input File Format
The input text file should be a .txt file with lines formatted as follows:

### Usage
To run the script, use the following command in your terminal:

```sh
node mainScript.js inputFile.txt
```

inputFile.txt: The path to the input text file containing the user metadata.
The output will be saved in a file named inputFile_output.json.


Example
```sh
node user-generator user_meta.txt
```
This will produce an output file named user_meta_output.json.

Main Script (mainScript.js)
```javascript
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
    console.error("Error reading input file:", err);
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
```

### Utility Modules

utils/splitLines.js
```javascript
const splitLines = (data) => {
  const lines = data.split("),\r\n");

  return lines.map((line) => {
    const splittedLine = line.slice(1, -1).split(", ");

    return {
      umeta_id: Number(splittedLine[0]),
      user_id: Number(splittedLine[1]),
      meta_key: splittedLine[2].slice(1, splittedLine[2].length - 1),
      meta_value: splittedLine[3].slice(1, splittedLine[3].length),
    };
  });
};

module.exports = splitLines;
```

utils/filterLines.js
```javascript
const keys = require("../lib/keys");

const filterLines = (lines) => {
  return lines.filter((line) => keys.includes(line.meta_key));
};

module.exports = filterLines;
```

utils/createUser.js
```javascript
const createUser = ({ umeta_id, user_id, meta_key, meta_value }) => {
  return {
    umeta_id,
    user_id,
    meta_keys: {
      [meta_key]: meta_value,
    },
  };
};

module.exports = createUser;
```

utils/createUsers.js
```javascript
const createUser = require("./createUser");

const createUsers = (lines) => {
  return lines.reduce((acc, cur) => {
    const existingUser = acc.find((user) => user.user_id === cur.user_id);

    if (!existingUser) {
      acc.push(createUser(cur));
    } else {
      existingUser.meta_keys[cur.meta_key] = cur.meta_value;
    }

    return acc;
  }, []);
};

module.exports = createUsers;
```

utils/sortUsers.js
```javascript
const sortUsers = (users) => {
  return users.sort((a, b) => b.user_id - a.user_id);
};

module.exports = sortUsers;
```

utils/createOutput.js
```javascript
const fs = require("fs");

const createOutput = (users, outputFileName) => {
  fs.writeFile(outputFileName, JSON.stringify(users, null, 2), (err) => {
    if (err) {
      console.error("Error writing output file:", err);
    } else {
      console.log(`Output file has been saved as ${outputFileName}`);
    }
  });
};

module.exports = createOutput;
```

### Conclusion
This setup improves modularity and clarity, making the script easier to maintain and extend. Each utility function is now in its own module, making the main script more readable and organized. The script includes error handling for better reliability and consistent logging for easier debugging.





