import * as directoryTree from 'directory-tree';
import * as fs from 'fs';
import * as path from 'path';



//@ts-ignore
const tree = directoryTree(path.join(__dirname, "../src/assets/goats"), { exclude: /map.json/ });
const generateLink = async (child: any) => {
  if (child.children) {
    for (const child1 of child.children) {
      child.children[child.children.indexOf(child1)] = await generateLink(child1);
    }
  } else {
    child.path = `data:image/${path.extname(child.name)};base64,${fs.readFileSync(child.path, 'base64')}`;
  }
  return child;
};
fs.writeFileSync(path.join(__dirname, "../src/assets/goats/map.json"), JSON.stringify(tree, null, 2).split(path.join(__dirname, '../src').split('\\').join('\\\\')).join('').split('\\\\').join('/'));
generateLink(tree).then(children => fs.writeFileSync(path.join(__dirname, "../src/assets/goats/map.data.json"), JSON.stringify(children, null, 2).split(path.join(__dirname, '../src').split('\\').join('\\\\')).join('').split('\\\\').join('/')));
