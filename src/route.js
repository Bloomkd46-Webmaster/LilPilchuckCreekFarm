//@ts-nocheck
const { execSync } = require('child_process');
const { readFileSync, writeFileSync } = require('fs');


if (execSync('git branch --show-current').toString() === 'main\n') {
  console.error('ERROR:', 'Please try again on gh-pages branch');
  process.exit(1);
}
const index = readFileSync('index.html');
const paths = ['does', 'bucks', 'pets', 'kidding-schedule', 'for-sale'];
for (const path in paths) {
  console.log('Generating', `${path}.html`);
  writeFileSync(`${path}.html`, index);
}
const does = require('./assets/goats/does.json');
for (const doe in does) {
  console.log('Generating', `does/${doe.nickname}.html`);
  writeFileSync(`does/${doe.nickname}.html`, index);
}
const bucks = require('./assets/goats/bucks.json');
for (const buck in bucks) {
  console.log('Generating', `bucks/${buck.nickname}.html`);
  writeFileSync(`bucks/${buck.nickname}.html`, index);
}
const forSale = require('./assets/goats/for-sale.json');
for (const goat in [...forSale.does, ...forSale.bucks, ...forSale.wethers]) {
  console.log('Generating', `for-sale/${goat.nickname}.html`);
  writeFileSync(`for-sale/${goat.nickname}.html`, index);
}
const pets = require('./assets/goats/pets.json');
for (const pet in pets) {
  console.log('Generating', `pets/${pet.nickname}.html`);
  writeFileSync(`pets/${pet.nickname}.html`, index);
}
