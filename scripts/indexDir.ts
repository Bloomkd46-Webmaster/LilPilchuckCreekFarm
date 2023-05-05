import * as dirTree from 'directory-tree';
import * as fs from 'fs';
import * as path from 'path';


//@ts-ignore
const tree: { children: Images; } = dirTree(path.join(__dirname, "../src/assets/goats"), { exclude: /\.json$|.DS_Store|.image/ });
//console.debug(tree);
/*const generateLink = async (child: any) => {
  if (child.children) {
    for (const child1 of child.children) {
      child.children[child.children.indexOf(child1)] = await generateLink(child1);
    }
  } else {
    console.log('Compiling', child.path);
    child.path = `data:image/${path.extname(child.name).replace('.', '')};base64,${fs.readFileSync(child.path, 'base64')}`;
  }
  return child;
};*/
console.log('Indexing');
fs.writeFileSync(path.join(__dirname, "../src/assets/goats/map.json"), JSON.stringify(tree, null, 2).split(path.join(__dirname, '../src').split('\\').join('\\\\')).join('').split('\\\\').join('/'));
////generateLink(tree).then(children => fs.writeFileSync(path.join(__dirname, "../src/assets/goats/map.data.json"), JSON.stringify(children, null, 2).split(path.join(__dirname, '../src').split('\\').join('\\\\')).join('').split('\\\\').join('/')));
const map: { [goat: string]: string; } = {};
/*for (const goat of tree.children) {
  console.log('Compiling', goat.name);
  const image = goat.children?.find(image => image.name.startsWith('display')) ?? (goat.children ?? [])[0];
  fs.writeFileSync(path.join(__dirname, `../src/assets/goats/${goat.name}.image`), `data:image/${path.extname(image.name).replace('.', '')};base64,${fs.readFileSync(image.path, 'base64url')}`);
  //fs.writeFileSync(path.join(__dirname, "../src/assets/goats/display-images.json"), `data:image/${path.extname(image.name).replace('.', '')};base64,${fs.readFileSync(image.path, 'base64')}`.split(path.join(__dirname, '../src').split('\\').join('\\\\')).join('').split('\\\\').join('/'));
}*/
//fs.writeFileSync(path.join(__dirname, "../src/assets/goats/display-images.json"), JSON.stringify(map, null, 2).split(path.join(__dirname, '../src').split('\\').join('\\\\')).join('').split('\\\\').join('/'));
type Images = Image[];
interface Image {
  path: string;
  name: string;
  children?: Images;
}
