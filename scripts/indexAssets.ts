import * as fs from 'fs/promises';
import * as path from 'path';



/**
 * Recursively walk a directory asynchronously and obtain all file names (with full path).
 *
 * @param dir Folder name you want to recursively process
 * @param root Where the paths should be relative from
 * @see https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search/50345475#50345475
 */
export const index = (
  dir: string,
  root: string
) => {
  return new Promise<string[]>((resolve, reject) => {
    let results: string[] = [];
    fs.readdir(dir, { withFileTypes: true }).then(list => {
      let pending = list.length;
      if (!pending) {
        return resolve(results);
      }
      list.forEach((file) => {
        const filePath = path.join(root, file.name);
        const fullPath = path.join(dir, file.name);
        //fs.stat(file, (err2, stat) => {
        if (file.isDirectory()) {
          index(fullPath, root).then(res => {
            if (res) {
              results = results.concat(res);
            }
            if (!--pending) {
              resolve(results);
            }
          }).catch(err => reject(err));
        } else {
          results.push(filePath);
          if (!--pending) {
            resolve(results);
          }
        }
      });
    }).catch(err => reject(err));
  });
};
index('src/assets', '/assets').then(res => console.log(res.map(res1 => res1.split(path.sep).join(path.posix.sep))));
