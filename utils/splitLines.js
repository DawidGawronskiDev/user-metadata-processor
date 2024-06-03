const splitLines = (data) => {
  const lines = data.split("),\r\n");

  const splittedLines = lines.map((line) => {
    const splittedLine = line.slice(1, -1).split(", ");

    return {
      umeta_id: Number(splittedLine[0]),
      user_id: Number(splittedLine[1]),
      meta_key: splittedLine[2].slice(1, splittedLine[2].length - 1),
      meta_value: splittedLine[3].slice(1, splittedLine[3].length),
    };
  });

  return splittedLines;
};

module.exports = splitLines;
