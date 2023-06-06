import http from 'http';
import fs from 'fs';
import {getFileList, getMP3Cover, getMusicMetadata} from './musicFinder'
import DataStore from 'nedb'
import { fromHomeDir } from '../../src/misc/util'
let libraryDB: DataStore
let playlistDB: DataStore
const initDB = () => {
  libraryDB = new DataStore({
    filename: fromHomeDir("libraryLib.db"),
    autoload: true
  })
  playlistDB = new DataStore({
    filename: fromHomeDir("playlist.db"),
    autoload: true
  });
}

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
    console.log('Req ' + url);
    // 感觉不如上express
    // TODO : 欢迎来到地狱！我的朋友！
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
          res.write(JSON.stringify(meta));
          // Why I need to invoke end() here but others don't?
          res.end()
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
    } else if (url.startsWith('/add-lib/')) {
      const path = url.replace(/^\/add-lib\//, '/')
      
      const filePaths = getFileList(path, /\.mp3$/i)

      interface MusicData {
        path: string;
        metadata: {title: string| undefined, artist: string | undefined, duration: number | undefined},
        liked: boolean;
      }

      const data: MusicData[] = []
      filePaths.forEach(element => {
        getMusicMetadata(element.path)
        .then(metadata => {
          data.push({path:element.path, metadata:metadata, liked: false})
        })
      });
      setTimeout(() => {
        libraryDB.insert(data, function (err, newDocs) {
          if (err) {
            console.error(err);
            res.writeHead(500)
            res.write('{count: ' + 0 + '}')    
            return res.end();
          } else {
            res.writeHead(200, 'application/json')
            res.write('{count: ' + newDocs.length + '}')
            return res.end()
          }
        })
      }, 100)
    } else if (url.startsWith('/get-lib')) {
      libraryDB.find({}, function(err: any, docs: any) {
        if (err) {
          console.error(err);
          res.writeHead(500)
          return res.end();
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.write(JSON.stringify(docs))
          return res.end();
        }
      })
    } else if (url.startsWith('/like/')) { // Deprecated
      const title = url.replace(/^\/like\//, '')
      // libraryDB.findOne({"metadata.title": title}, (err: any, docs: any) => {
      //   if (err) {
      //     console.error(err);
      //     res.writeHead(500)
      //     return res.end()
      //   }
      //   console.log(docs);
        
      //   libraryDB.update({_id: docs._id}, {$set: {liked: !docs}})
      //   res.writeHead(200, {'content-type': 'application/json'})
      //   res.write(JSON.stringify(docs))
      //   res.end()
      // })
      libraryDB.update({ 'metadata.title': title }, { $set: { liked: { $not: '$liked' } } }, { multi: true }, function(err, numAffected, affectedDocuments) {
        if (err) {
          console.log('Update failed:', err);
          return;
        }
        console.log('Number of documents matched and updated:', numAffected);
      });

    } else if (url.startsWith('/search/')) {
      const target = url.split('/')[3]
      const type = url.split('/')[2] // name, artist, album
      
      const regex = new RegExp(target, 'i')

      if (type == 'name' ) {
        libraryDB.find({ "metadata.title": { $regex: regex } }, function (err: any, docs: any) {
        if (err) {
          console.error(err);
          res.writeHead(500)
          return res.end();
        }
        res.writeHead(200, { 'Content-Type': 'application/json'})
        res.write(JSON.stringify(docs))
        res.end();
      })
    } else if (type == 'artist') {
        libraryDB.find({ "metadata.artist": { $regex: regex} }, function (err: any, docs: any) {
          if (err) {
            console.error(err);
            res.writeHead(500)
            return res.end();
          }
          res.writeHead(200, { 'Content-Type': 'application/json'})
          res.write(JSON.stringify(docs))
          res.end();
        })
      };
    } else if (url.startsWith('/add-playlist')) { // POST
      // Generate by GPT-3.5
      let postData = ''
      req.on('data', (chunk: any) => {
        postData += chunk.toString(); // 拼接 POST 请求数据
      });
      req.on('end', () => {
        // console.log("DATA:"+postData); // 打印 POST 请求数据
  
        const postDataObj = JSON.parse(postData); // 解析 POST 请求数据为 JSON 对象
        // console.log("TO JSON:"+postDataObj); // 打印 POST 请求数据的 JSON 对象
        playlistDB.insert(postDataObj, function(err: any, docs: any) {
          if (err) {
            console.error(err);
            res.writeHead(500)
            return res.end();
          } 
          res.writeHead(200, {'Content-Type': 'application/json'}); // 设置响应头信息
          res.end(JSON.stringify({status: 'ok'})); // 返回响应结果
        })
        
      });
    } else if (url.startsWith('/add2playlist')) { // {playlistName, songPath}. POST
      let postData = ''
      req.on('data', (chunk: any) => {
        postData += chunk.toString(); // 拼接 POST 请求数据
      });
      req.on('end', () => {
        // console.log("DATA:"+postData); // 打印 POST 请求数据
        
        const postDataObj = JSON.parse(postData); // 解析 POST 请求数据为 JSON 对象

        getMusicMetadata(postDataObj.songPath)
          .then(meta => {
            playlistDB.update(
              { playlistName: postDataObj.playlistName }, // 匹配条件
              { $push: { playlist: {path: postDataObj.songPath, metadata: meta} } }, // 更新操作，向 playlist 数组中插入 testSong 元素
              { upsert: true }, // 如果查找不到相应的文档，则插入一个新文档
              function (err: any) {
                if (err) {
                  console.error(err);
                  res.writeHead(500)
                  return res.end();
                }
                res.writeHead(200, {'Content-Type': 'application/json'}); // 设置响应头信息
                res.end(JSON.stringify({status: 'ok'})); // 返回响应结
            });
          })
          .catch(err => {console.error(err)})
      })      
    } else if (url.startsWith('/get-playlist')) { // 获取全部信息
      playlistDB.find({}, {playlistName: 1, description: 1}, function (err, docs) {
        if (err) {
          res.writeHead(500);
          console.error(err);
          return res.end();
        }
        res.writeHead(200);
        res.write(JSON.stringify(docs));
        res.end();
      })
    } else if (url.startsWith('/playlist')) { // + playlistName
      const playlist = url.split('/')[2]
      console.log(playlist);
      
      playlistDB.findOne({playlistName: playlist}, function(err: any, docs: any) {
        if (err) {
          res.writeHead(500);
          console.error(err);
          return res.end()
        }
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(docs));
        res.end()
      })

    } else {
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
  createServerWithMusicPath, initDB
}

