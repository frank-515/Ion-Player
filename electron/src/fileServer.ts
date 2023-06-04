import http from 'http';
import fs from 'fs';
import path from 'path';
import {getFileList, getMP3Cover, getMusicMetadata} from './musicFinder'

/**
 * Generates By GPT-3.5
 * createServerWithMusicPath 函数
 * @param {number} port - 服务器端口号
 * @return {http.Server} - 返回创建的 HTTP 服务器
 * @API /music/[path]
 */
const createServerWithMusicPath = (port: number): http.Server => {
  // 创建 HTTP 服务器
  const server = http.createServer(function (req: any, res: any) {
    // 解析请求的 URL
    const url = decodeURIComponent(req.url);
    console.log(url);
    // 如果请求的是 /music/* 路径
    if (url.startsWith('/music/')) {
      // 获取请求文件的绝对路径
      // const filePath = path.join(__dirname, url.slice('/music/'.length));
      const filePath = url.replace(/^\/music\//, '/')
      
      // 检查文件是否存在
      fs.access(filePath, function (err: any) {
        if (err) {
          // 文件不存在，返回 404
          res.writeHead(404);
          res.write(`File '${filePath}' not found!`);
          return res.end();
        }

        // 文件存在，返回文件内容
        res.writeHead(200, { 'Content-Type': 'audio/mpeg' });
        const stream = fs.createReadStream(filePath);
        stream.pipe(res);
      });
    } else if (url.startsWith('/data/')) {
      // 返回元数据
      // 获取请求文件的绝对路径
      const filePath = url.replace(/^\/data\//, '/')
      
      // 检查文件是否存在
      fs.access(filePath, function (err: any) {
        if (err) {
          // 文件不存在，返回 404
          res.writeHead(404);
          res.write(`File '${filePath}' not found!`);
          return res.end();
        }

        // 文件存在，返回文件元数据
        getMusicMetadata(filePath).then(meta => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(meta);
        })
        .catch(err => {console.error(err)})
      });
    } else if (url.startsWith('/cover/')) {
      // 返回封面
      // 获取请求文件的绝对路径
      const filePath = url.replace(/^\/cover\//, '/')
      
      // 检查文件是否存在
      fs.access(filePath, function (err: any) {
        if (err) {
          // 文件不存在，返回 404
          res.writeHead(404);
          res.write(`File '${filePath}' not found!`);
          return res.end();
        }

        // 文件存在，返回文件封面数据
        getMP3Cover(filePath).then(cover => {
          res.writeHead(200, { 'Content-Type': 'image/jpeg' });
          res.write(cover);
        })
        .catch(err => {console.error(err)})
        
      });
    } else  {
      // 如果请求的是其他路径，则返回 404
      res.writeHead(404);
      res.write(`URL '${url}' not found!`);
      return res.end();
    }
  });

  // 监听服务器端口
  server.listen(port, function () {
    console.log(`Server is running at http://localhost:${port}`);
  });

  return server;
};

// 调用函数并传入端口号
// 如何从vite获取端口号?

export {
  createServerWithMusicPath
}

