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