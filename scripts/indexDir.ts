const dirTree = require("directory-tree");
const path = require('path');
const fs = require('fs');
const tree = dirTree(path.join(__dirname, "../src/assets"), { exclude: /map.json/ });
fs.writeFileSync(path.join(__dirname, "../src/assets/map.json"), JSON.stringify(tree, null, 2).split(path.join(__dirname, '../src')).join(''));
