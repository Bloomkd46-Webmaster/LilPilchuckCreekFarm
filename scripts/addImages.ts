#!/usr/bin/env node
import axios from 'axios';
import * as fs from 'fs';
import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';
import * as path from 'path';



const rl = readline.createInterface({ input, output });


/** Remove the first two irrelevant arguments */
const myArgs = process.argv.slice(2);
/** Ensure that all arguments are present */
if (myArgs.length < 1) {
  console.log('Usage:  <goat nickname> [image url/path]');
  process.exit(1);
}
function titleCase(string: string) {
  var sentence = string.toLowerCase().split(' ');
  for (var i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }
  return sentence.join(' ');
}
myArgs[0] = titleCase(myArgs[0]);
/**
 * download a file from {@link fileUrl} to {@link downloadFolder}
 * @param {string} fileUrl the link to download
 * @param {string} downloadFolder the folder to save the images in
 */
const downloadFile = async (fileUrl: string, downloadFolder: string) => {
  return new Promise<void>((resolve, reject) => {
    /** The image name to save the file under */
    const fileName = path.basename(fileUrl.split('?')[0]);
    /** The path to save the image in */
    const localFilePath = path.resolve(__dirname, '../src/assets/goats/', downloadFolder, fileName);
    /** The link response to pipe */
    axios({
      method: 'GET',
      url: fileUrl,
      responseType: 'stream',
    }).then(response => {
      const w = response.data.pipe(fs.createWriteStream(localFilePath));
      w.on('finish', () => {
        console.log('Successfully downloaded file');
        resolve();
      });
    }).catch(err => reject(err));
  });
};
/**
 * copy a file from {@link fileDir} to {@link downloadFolder}
 * @param {string} fileDir the link to download
 * @param {string} downloadFolder the folder to save the images in
 */
const copyFile = (fileDir: string, downloadFolder: string) => {
  /** The image name to save the file under */
  const fileName = path.basename(fileDir);
  /** The path to save the image in */
  const localFilePath = path.resolve(__dirname, '../src/assets/goats/', downloadFolder, fileName);
  try {
    fs.copyFileSync(fileDir, localFilePath);
    console.log('Successfully copied file');
  } catch (err: any) {
    throw new Error(err);
  }
  return;
};
if (!fs.existsSync(path.resolve(__dirname, '../src/assets/goats/', myArgs[0]))) {
  fs.mkdirSync(path.resolve(__dirname, '../src/assets/goats/', myArgs[0]));
}
if (!myArgs[1]) {
  const ask = () => {
    rl.question('What image would you like to add to ' + myArgs[0] + '?\n').then(async res => {
      res = /'|"|`/g.test(res) ? JSON.parse(res.replace(/'|`/g, '"')) : res;
      if (res.includes('://')) {
        await downloadFile(res, myArgs[0]);
      } else {
        copyFile(res, myArgs[0]);
      }
      ask();
    });
  };
  ask();
} else if (myArgs[1].includes('://')) {
  downloadFile(myArgs[1], myArgs[0]).then(() => process.exit());
} else {
  copyFile(myArgs[1], myArgs[0]);
  process.exit();
}
