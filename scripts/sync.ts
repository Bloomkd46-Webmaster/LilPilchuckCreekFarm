import ADGA, { OwnedGoats } from 'adga';
import * as fs from 'fs';
import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';
import * as path from 'path';



const rl = readline.createInterface({ input, output });
const config: { does: OwnedGoats['result']['items'] & { nickname: string; description: string; }[]; bucks: OwnedGoats['result']['items'] & { nickname: string; description: string; }[]; } = require('../src/app/goats.json');
const credentials: { username?: string, password?: string, accountId?: number; } = {};
/** Remove the first two irrelevant arguments */
const myArgs = process.argv.slice(2);
/** Ensure that all arguments are present */
if (myArgs.length < 2) {
  if (fs.existsSync(path.join(process.cwd(), 'credentials.txt'))) {
    console.log('Using credentials from', path.join(process.cwd(), 'credentials.txt'));
    const credentialFile = fs.readFileSync(path.join(process.cwd(), 'credentials.txt'), 'utf8');
    const splitCredentials = credentialFile.split('\n');
    Object.assign(credentials, { username: splitCredentials[0], password: splitCredentials[1], accountId: splitCredentials[2] });
  } else {
    console.log('Usage:  <Username> <Password> [Account ID]');
    process.exit(1);
  }
} else {
  Object.assign(credentials, { username: myArgs[0], password: myArgs[1], accountId: myArgs[2] });
}
function titleCase(string: string) {
  var sentence = string.toLowerCase().split(' ');
  for (var i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }
  return sentence.join(' ');
}
(async () => {
  const adga = await ADGA.init(credentials.username!, credentials.password!);
  const goats = await adga.getOwnedGoats(credentials.accountId || undefined);
  for (const goat of goats.items) {
    const doe = config.does.find(configGoat => configGoat.name === goat.name);
    const buck = config.bucks.find(configGoat => configGoat.name === goat.name);
    if (doe) {
      //@ts-ignore
      Object.assign(config.does[config.does.indexOf(doe)], goat, { description: config.does[config.does.indexOf(doe)].description || await rl.question(`What would you like to set the description to for '${(doe).nickname}'?\n(optional) `) || '', });
    } else if (buck) {
      //@ts-ignore
      Object.assign(config.bucks[config.bucks.indexOf(buck)], goat, { description: config.bucks[config.bucks.indexOf(buck)].description || await rl.question(`What would you like to set the description to for '${(buck).nickname}'?\n(optional) `) || '', });
    } else {
      const nickname = titleCase(await rl.question(`What would you like to set the nickname to for '${goat.name}'?\n(${titleCase(goat.name.split(' ').pop()!)}) `) || goat.name.split(' ').pop()!);
      config[goat.sex === 'Female' ? 'does' : 'bucks'].push(Object.assign(goat, {
        nickname: nickname,
        description: await rl.question(`What would you like to set the description to for '${nickname}'?\n(optional) `) || '',
      }));
    }
  }
  fs.writeFileSync(path.join(__dirname, '../src/app/goats.json'), JSON.stringify(config, null, 2));
  process.exit();
})();
