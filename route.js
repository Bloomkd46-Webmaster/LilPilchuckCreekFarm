//@ts-nocheck
const { execSync } = require('child_process');
const { readFileSync, writeFileSync } = require('fs');


if (execSync('git branch --show-current').toString() === 'main\n') {
  console.error('ERROR:', 'Please try again on gh-pages branch');
  process.exit(1);
}
const index = readFileSync('index.html');
const paths = ['does', 'bucks', 'pets', 'kidding-schedule', 'for-sale'];
const sitemap = ['']
for (const path in paths) {
  const file = `${path}.html`
  console.log('Generating', file);
  writeFileSync(file, index);
  sitemap.push(file.replace('.html', ''));
}
const does = require('./assets/goats/does.json');
for (const doe in does) {
  const file = `does/${doe.nickname}.html`
  console.log('Generating', file);
  writeFileSync(file, index);
  sitemap.push(file.replace('.html', ''));
}
const bucks = require('./assets/goats/bucks.json');
for (const buck in bucks) {
  const file = `bucks/${buck.nickname}.html`
  console.log('Generating', file);
  writeFileSync(file, index);
  sitemap.push(file.replace('.html', ''));
}
const forSale = require('./assets/goats/for-sale.json');
for (const goat in [...forSale.does, ...forSale.bucks, ...forSale.wethers]) {
  const file = `for-sale/${goat.nickname}.html`
  console.log('Generating', file);
  writeFileSync(file, index);
  sitemap.push(file.replace('.html', ''));
}
const pets = require('./assets/goats/pets.json');
for (const pet in pets) {
  const file = `pet/${pet.nickname}.html`
  console.log('Generating', file);
  writeFileSync(file, index);
  sitemap.push(file.replace('.html', ''));
}
sitemap.map(path => `https://www.lilpilchuckcreek.org/${path}`);
writeFileSync('sitemap.txt', sitemap.join('\n'));
