var fs = require('fs');
var path = require('path');

var options = process.argv;  // 拿取命令传递的参数
var soure = options[2];  // 创建文件地址 components view
var folderName = options[3];  // 创建文件名称

function mkdirFile(url) {
  return new Promise(function (resolve, reject) {
    fs.mkdir(url, function (err) {
      if (err) {
        console.warn('创建' + url + '文件夹失败' + err);
        reject();
      } else {
        console.log('创建' + url + '文件夹成功');
        resolve();
      }
    });
  });
}

function writeFile(url, content = '') {
  return new Promise(function (resolve, reject) {
    fs.writeFile(url, content, function (err) {
      if (err) {
        console.warn('创建' + url + '文件失败' + err);
        reject();
      } else {
        console.log('创建' + url + '文件成功');
        resolve();
      }
    });
  });
}

function getJsContent(name) {
  var firstUpperCase = str => str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
  var jsContent = `import React from 'react';
import './${name}.css';

class ${firstUpperCase(name)} extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="${name}">

      </div>
    );
  }
}

export default ${firstUpperCase(name)}; `;
return jsContent;
}

function start() {
  var folder = soure == 'com' ? 'components' : 'view';
  var dist_url = __dirname;
  dist_url += process.platform == 'win32' ? '\\src\\' + folder : '/src/' + folder;
  var _folderName = dist_url + (process.platform == 'win32' ? '\\' + folderName : '/' + folderName);
  var _cssName = _folderName + (process.platform == 'win32' ? '\\' + folderName + '.css' : '/' + folderName + '.css');
  var _jsName = _folderName + (process.platform == 'win32' ? '\\' + folderName + '.js' : '/' + folderName + '.js');

  if (!fs.existsSync(dist_url)) {
    console.log('没有' + folder + '文件夹，将新建');
    mkdirFile(dist_url).then(() => {
      mkdirFile(_folderName).then(() => {
        writeFile(_cssName);
        writeFile(_jsName, getJsContent(folderName));
      });
    });
  } else {
    console.log('有' + folder + '文件夹');
    mkdirFile(_folderName).then(() => {
      writeFile(_cssName);
      writeFile(_jsName, getJsContent(folderName));
    });
  }
}

start();
