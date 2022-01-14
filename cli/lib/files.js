const fs = require("fs");
const path = require("path");

const listNestedFiles = (directory, filter, filteredFiles) => {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  for (const entry of entries) {
    const next = path.resolve(directory, entry.name);
    if (entry.isDirectory()) {
      listNestedFiles(next, filter, filteredFiles);
    }
    if (entry.isFile() && filter(entry)) {
      filteredFiles.push(next);
    }
  }
};

const listFiles = (directory, filter) => {
  const filteredFiles = [];
  listNestedFiles(directory, filter, filteredFiles);
  return filteredFiles;
};

module.exports = {
  listFiles,
};
