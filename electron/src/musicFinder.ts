import * as fs from 'fs';
import * as path from 'path';
import { parseFile }  from  'music-metadata' 


async function getMusicMetadata(filename: string): Promise<{ artist: string | undefined, title: string | undefined}> {
  try {
    const metadata = await parseFile(filename);
    return {artist: metadata.common.artist, title: metadata.common.title};
  } catch (error:any) {
    console.error(error.message);
    return {artist: undefined, title: undefined};
  }
}
async function getMP3Cover(filepath: string) {
  const metadata = await parseFile(filepath);
  const picture = metadata.common.picture;

  if (picture && picture.length > 0) {
    return picture[0].data;
  } else {
    return null;
  }
}

/**
 * 递归遍历文件夹，返回符合正则表达式的文件名数组
 * Generate by gpt-3.5
 * @param {string} dir 目标文件夹路径
 * @param {RegExp} reg 指定正则表达式
 * @return {Array} 符合指定正则表达式的文件名数组
 */
function getFileList(dir: string, reg: RegExp): string[] {
    let fileList: string[] = [];
  
    try {
      // 读取目录
      const files: string[] = fs.readdirSync(dir);
  
      // 遍历目录下所有文件
      for (const file of files) {
        const filePath: string = path.join(dir, file);
  
        // 如果是文件夹就递归遍历
        if (fs.statSync(filePath).isDirectory()) {
          fileList = fileList.concat(getFileList(filePath, reg));
        } else {
          // 如果是文件，则判断是否符合正则表达式
          if (reg.test(file)) {
            fileList.push(filePath);
          }
        }
      }
    } catch (err: any) {
      console.error(`Something went wrong: ${err.message}`);
    }
  
    return fileList;
  }

  export {
    getFileList, getMusicMetadata, getMP3Cover
  }