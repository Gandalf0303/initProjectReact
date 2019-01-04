const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const log = console.log;

fs.readdirSync(path.resolve('../src/assets/', 'locales')).forEach(file => {
  console.log('file ==> ', file);
  if (
    fs.statSync(path.resolve('../src/assets/', `locales/${file}`)).isDirectory()
  ) {
    fs.readdirSync(path.resolve('../src/assets/', `locales/${file}`)).forEach(
      fName => {
        console.log('file, fileName ==> ', file, fName);
        if (file !== 'en_US' && fName === 'translations.js') {
          log(
            chalk.green(
              `Tìm thấy và Đọc file ${chalk.yellow(
                `${file}/${fName}`
              )}...... \n`
            )
          );
          const arrayTemp = fs
            .readFileSync(
              path.resolve('../src/assets/', `locales/${file}/${fName}`),
              'utf8'
            )
            .split(/[\n\r]/g);
          const array = arrayTemp.slice(1, arrayTemp.length - 2);
          const objTemp = {};

          log(
            chalk.green(
              `Them tien to ${chalk.yellow(`${file}/${fName}`)}...... \n`
            )
          );
          for (let i of array) {
            if (i.endsWith(',')) i = i.substr(0, i.length - 1);
            if (!i.startsWith('}') && !i.startsWith('{')) {
              const objConvert = JSON.parse(`{ ${i} }`);
              const key = Object.keys(objConvert)[0];
              const value = Object.values(objConvert)[0];
              objTemp[key] = `${file} ${value}`;
            }
          }
          log(
            chalk.green(
              `===> Ghi file /fixs/${file}.${fName} đã Them tien to \n`
            )
          );
          fs.writeFileSync(
            `${path.join(__dirname, '/fix')}/${file}.json`,
            JSON.stringify(objTemp)
          );
          log(chalk.cyan(`===> Xử lý xong ${file}`));
        }
      }
    );
  }
});
