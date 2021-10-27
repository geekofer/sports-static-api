const fs = require("fs");
const path = require("path");

const storage = (folder, filename, data) => {
  fs.writeFileSync(
    path.resolve(`${__dirname}/../../data/${folder}/`, filename),
    JSON.stringify(data)
  );
};

module.exports = { storage };