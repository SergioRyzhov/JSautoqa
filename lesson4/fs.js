const fse = require("fs-extra");
const path = require("path");

const dirPath = path.join(__dirname, '');

try {
    fse.ensureDirSync(dirPath + '/test_dir_1');
    console.log('/test_dir_1 was created');
    fse.ensureFileSync('./test_dir_1/test.txt');
    console.log('/test_dir_1/test.txt was created');
    fse.ensureDirSync(dirPath + '/test_dir_2');
    console.log('/test_dir_2 was created');
    fse.moveSync('./test_dir_1/test.txt', './test_dir_2/test.txt', {overwrite: true});
    console.log('test.txt was moved from /test_dir_1 to /test_dir_2');
    fse.ensureDirSync(dirPath + '/test_dir_3');
    console.log('/test_dir_3 was created');
    fse.copyFileSync('./test_dir_2/test.txt', './test_dir_3/test.txt');
    console.log('test.txt was copied from /test_dir_2 to /test_dir_3');
    fse.removeSync('./test_dir_2/test.txt');
    fse.removeSync('./test_dir_3/test.txt');
    fse.removeSync('./test_dir_1');
    fse.removeSync('./test_dir_2');
    fse.removeSync('./test_dir_3');
    console.log('all files and dirs were removed.');
  } catch (err) {
    console.error(err);
  }