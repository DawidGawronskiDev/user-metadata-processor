const keys = require("../lib/keys");

const filterLines = (lines) => {
  const filteredLines = lines.filter((line) => keys.includes(line.meta_key));

  return filteredLines;
};

module.exports = filterLines;
