'use strict';

var fs = require('fs');

fs.readFile('sample.txt', 'utf-8', function (err, data) {
  if (err) {
    console.log('TxtErr', err)
  } else {
    console.log('TxtData', data)
  }
})

fs.readFile('sample.png', function (err, data) {
  if (err) {
    console.log('imgErr', err)
  } else {
    console.log('imgData', data)
    console.log('imgData.length', data.length + 'bytes')
  }
})

fs.stat('sample.txt', function (err, stat) {
  if (err) {
    console.log(err);
  } else {
    // 是否是文件:
    console.log('isFile: ' + stat.isFile());
    // 是否是目录:
    console.log('isDirectory: ' + stat.isDirectory());
    if (stat.isFile()) {
      // 文件大小:
      console.log('size: ' + stat.size);
      // 创建时间, Date对象:
      console.log('birth time: ' + stat.birthtime);
      // 修改时间, Date对象:
      console.log('modified time: ' + stat.mtime);
    }
  }
});

var data = 'Hello Node.js'
fs.writeFile('output.txt', data, function (err) {
  if (err) {
    console.log('writeFileErr', err)
  } else {
    console.log('writeFile OKs')
  }
})

var rs = fs.createWriteStream('sample.txt', 'utf-8')

rs.on('data', function (chunk) {
  console.log('Data')
  console.log(chunk)
})

rs.on('end', function () {
  console.log('END')
})

rs.on('error', function (err) {
  console.log('ERROR:' + err)
})

// 导入http模块:
var http = require('http')

// 创建http server，并传入回调函数:
var server = http.createServer(function (request, response) {
  // 回调函数接收request和response对象,
  // 获得HTTP请求的method和url
  console.log(request.method + ':' + request.url)
  // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
  response.writeHead(200, {
    'Content-type': 'text/html'
  })
  // 将HTTP响应的HTML内容写入response
  response.end('<h1>Hello World</h1>')
})

server.listen(8085)

console.log('Server is running at http://127.0.0.1:8085/')

var url = require('url')

console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'));

var path = require('path')

var workDir = path.resolve('.')

var filePath = path.join(workDir, 'pub', 'index.html')


// crypto模块的目的是为了提供通用的加密和哈希算法。用纯JavaScript代码实现这些功能不是不可能，但速度会非常慢。Nodejs用C/C++实现这些算法后，通过cypto这个模块暴露为JavaScript接口，这样用起来方便，运行速度也快。
const crypto = require('crypto')

// MD5是一种常用的哈希算法，用于给任意数据一个“签名”。这个签名通常用一个十六进制的字符串表示：
const hash = crypto.createHash('md5')

hash.update('Hello, world')
hash.update('Hello, nodejs!')
console.log('hash.digest(\'hex\')', hash.digest('hex'))

// Hmac算法也是一种哈希算法，它可以利用MD5或SHA1等哈希算法。不同的是，Hmac还需要一个密钥：
const hmac = crypto.createHmac('sha256', 'secret-key');

hmac.update('Hello, world!');
hmac.update('Hello, nodejs!');

console.log('hmac.digest(\'hex\')', hmac.digest('hex')); // 80f7e22570...

// AES是一种常用的对称加密算法，加解密都用同一个密钥。crypto模块提供了AES支持，但是需要自己封装好函数，便于使用：
function aesEncrypt(data, key) {
  const cipher = crypto.createCipher('aes192', key);
  var crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function aesDecrypt(encrypted, key) {
  const decipher = crypto.createDecipher('aes192', key);
  var decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

var data = 'Hello, this is a secret message!';
var key = 'Password!';
var encrypted = aesEncrypt(data, key);
var decrypted = aesDecrypt(encrypted, key);

console.log('Plain text: ' + data);
console.log('Encrypted text: ' + encrypted);
console.log('Decrypted text: ' + decrypted);

// DH算法是一种密钥交换协议，它可以让双方在不泄漏密钥的情况下协商出一个密钥来。DH算法基于数学原理，比如小明和小红想要协商一个密钥，可以这么做：

// 小明先选一个素数和一个底数，例如，素数p=23，底数g=5（底数可以任选），再选择一个秘密整数a=6，计算A=g^a mod p=8，然后大声告诉小红：p=23，g=5，A=8；

// 小红收到小明发来的p，g，A后，也选一个秘密整数b=15，然后计算B=g^b mod p=19，并大声告诉小明：B=19；

// 小明自己计算出s=B^a mod p=2，小红也自己计算出s=A^b mod p=2，因此，最终协商的密钥s为2。

// 在这个过程中，密钥2并不是小明告诉小红的，也不是小红告诉小明的，而是双方协商计算出来的。第三方只能知道p=23，g=5，A=8，B=19，由于不知道双方选的秘密整数a=6和b=15，因此无法计算出密钥2。

// 用crypto模块实现DH算法如下：

// xiaoming's keys:
var ming = crypto.createDiffieHellman(512);
var ming_keys = ming.generateKeys();

var prime = ming.getPrime();
var generator = ming.getGenerator();

console.log('Prime: ' + prime.toString('hex'));
console.log('Generator: ' + generator.toString('hex'));

// xiaohong's keys:
var hong = crypto.createDiffieHellman(prime, generator);
var hong_keys = hong.generateKeys();

// exchange and generate secret:
var ming_secret = ming.computeSecret(hong_keys);
var hong_secret = hong.computeSecret(ming_keys);

// print secret:
console.log('Secret of Xiao Ming: ' + ming_secret.toString('hex'));
console.log('Secret of Xiao Hong: ' + hong_secret.toString('hex'));