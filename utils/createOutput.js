const fs = require("fs");

const createOutput = (users, output) => {
  fs.writeFile(output, JSON.stringify(users, null, 2), (err) => {
    if (err) {
      console.log("Error writing file:", err);
    } else {
      console.log("JSON file has been saved.");
    }
  });
};

module.exports = createOutput;
