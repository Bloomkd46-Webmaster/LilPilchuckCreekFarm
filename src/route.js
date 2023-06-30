const { execSync } = require('child_process');
const { readFileSync, writeFileSync, mkdirSync } = require('fs');


if (execSync('git branch --show-current').toString() === 'main\n') {
  console.error('ERROR:', 'Please try again on gh-pages branch');
  process.exit(1);
}
const index = readFileSync('index.html');
const paths = ['does', 'bucks', 'pets', 'kidding-schedule', 'for-sale', 'blog'];
const sitemap = [''];
for (const path of paths) {
  const file = `${path}.html`;
  console.log('Generating', file);
  writeFileSync(file, index);
  sitemap.push(file.replace('.html', ''));
}
const does = require('./assets/goats/does.json');
mkdirSync('does');
for (const doe of does) {
  const file = `does/${doe.nickname}.html`;
  console.log('Generating', file);
  writeFileSync(file, index);
  sitemap.push(file.replace('.html', ''));
}
const bucks = require('./assets/goats/bucks.json');
mkdirSync('bucks');
for (const buck of bucks) {
  const file = `bucks/${buck.nickname}.html`;
  console.log('Generating', file);
  writeFileSync(file, index);
  sitemap.push(file.replace('.html', ''));
}
const forSale = require('./assets/goats/for-sale.json');
mkdirSync('for-sale');
for (const goat of [...forSale.does, ...forSale.bucks, ...forSale.pets]) {
  const file = `for-sale/${goat.nickname}.html`;
  console.log('Generating', file);
  writeFileSync(file, index);
  sitemap.push(file.replace('.html', ''));
}
const pets = require('./assets/goats/pets.json');
mkdirSync('pets');
for (const pet of pets) {
  const file = `pets/${pet.nickname}.html`;
  console.log('Generating', file);
  writeFileSync(file, index);
  sitemap.push(file.replace('.html', ''));
}
console.log('Generating', 'sitemap.txt');
writeFileSync('sitemap.txt', sitemap.map(path => `https://www.lilpilchuckcreek.org/${path}`).join('\n'));
