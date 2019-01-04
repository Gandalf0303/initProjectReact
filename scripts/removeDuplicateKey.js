const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const log = console.log;
function removeDuplicate() {
  fs.readdirSync(path.resolve('../src/assets/', '/locales')).forEach(file => {
    if (
      fs
        .statSync(path.resolve('../src/assets/', `locales/${file}`))
        .isDirectory()
    ) {
      fs.readdirSync(path.resolve('../src/assets/', `locales/${file}`)).forEach(
        fName => {
          if (fName === 'translations.json') {
            log(
              chalk.green(
                `Tìm thấy và Đọc file ${chalk.yellow(
                  `${file}/${fName}`
                )}...... \n`
              )
            );
            const array = fs
              .readFileSync(
                path.resolve('../src/assets/', `locales/${file}/${fName}`),
                'utf8'
              )
              .split(/[\n\r]/g);
            const objTemp = {};
            const keyDuplicate = [];

            log(
              chalk.green(
                `Duyệt trùng key của ${chalk.yellow(
                  `${file}/${fName}`
                )}...... \n`
              )
            );
            for (let i of array) {
              if (i.endsWith(',')) i = i.substr(0, i.length - 1);
              if (!i.startsWith('}') && !i.startsWith('{')) {
                const objConvert = JSON.parse(`{ ${i} }`);
                const key = Object.keys(objConvert)[0];
                const value = Object.values(objConvert)[0];
                if (objTemp[key] && objTemp[key].length > 0) {
                  objTemp[key] += value;
                  keyDuplicate.push(key);
                } else {
                  objTemp[key] = value;
                }
              }
            }
            if (keyDuplicate.length > 0) {
              log(
                chalk.bgRed(
                  `===> File ${chalk.yellow(`${file}/${fName}`)} có ${
                    keyDuplicate.length
                  } key trùng lặp \n`
                )
              );
              log(
                chalk.magenta(
                  `===> Kiểm tra file /fixs/${file}_duplicate.json để xem danh sách key trùng lặp \n`
                )
              );
              !fs.existsSync(path.resolve('../src/assets/locales/', '/fix')) &&
                fs.mkdirSync(path.resolve('../src/assets/locales/', '/fix'));
              fs.writeFileSync(
                `${path.resolve(
                  '../src/assets/locales/',
                  '/fix'
                )}/${file}_duplicate.json`,
                JSON.stringify(keyDuplicate)
              );
              log(
                chalk.green(
                  `===> Ghi file /fixs/${file}.${fName} đã loại bỏ key trùng lặp \n`
                )
              );
              fs.writeFileSync(
                `${path.resolve(
                  '../src/assets/locales/',
                  '/fix'
                )}/${file}.${fName}`,
                JSON.stringify(objTemp)
              );
              log(chalk.cyan(`===> Xử lý xong ${file}`));
            } else {
              log(
                chalk.blue(
                  `===> File ${chalk.yellow(
                    `${file}/${fName}`
                  )} không có key nào trùng lặp \n`
                )
              );
            }
          }
        }
      );
    }
  });
}
