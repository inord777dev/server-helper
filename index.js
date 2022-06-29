import fs from 'fs';
import path from 'path';
import express from 'express';
import 'dotenv/config';

const app = express();
const dirname = process.env.dirname || path.resolve(path.dirname('.repo/nodejs/v16.15.1'));

function fileDownload(res, fileName) {
  const fullName = path.join(dirname, fileName);
  var file = fs.readFileSync(fullName, 'binary');
  console.log(fullName);

  res.setHeader('Content-Length', file.length);
  res.write(file, 'binary');
  res.end();
}

app.get('/v16.15.1/node-v16.15.1-headers.tar.gz', function (req, res) {
  fileDownload(res, '/v16.15.1/node-v16.15.1-headers.tar.gz');
});

app.get('/v16.15.1/SHASUMS256.txt', function (req, res) {
  fileDownload(res, '/v16.15.1/SHASUMS256.txt');
});

app.get('/v16.15.1/win-x86/node.lib', function (req, res) {
  fileDownload(res, '/v16.15.1/win-x86/node.lib');
});

app.get('/v16.15.1/win-x64/node.lib', function (req, res) {
  fileDownload(res, '/v16.15.1/win-x64/node.lib');
});

// app.get('/v16.15.1/win-arm64/node.lib', function (req, res) {
//   fileDownload(res, '/v16.15.1/win-arm64/node.lib');
// });

app.listen(8080, () => {
  console.log('listen 8080');
});
