const version = require('./public/version');
const fs = require('fs');

const updateVersion = (v) => {
  let num = Number(v.split('.').join(''));
  let newVersion = (num + 1).toString().split('').join('.');
  let template = `var version = '${newVersion}';
if (typeof window !== 'undefined') {
  window.version = version;
} else {
  module.exports = version;
}`;

  fs.writeFile('./public/version.js', template, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('版本号更新为：', newVersion);
    }
  });
};

updateVersion(version);
