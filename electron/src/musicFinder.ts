import * as fs from 'fs';
import * as path from 'path';
import { parseFile }  from  'music-metadata' 


async function getMusicMetadata(filename: string): Promise<{ artist: string | undefined, title: string | undefined, duration: number | undefined}> {
  try {
    const metadata = await parseFile(filename);
    return {artist: metadata.common.artist, title: metadata.common.title, duration: metadata.format.duration};
  } catch (error:any) {
    console.error(error.message);
    return {artist: undefined, title: undefined, duration: undefined};
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

interface File {
  path: string;
}

function getFileList(dir: string, reg: RegExp): File[] {
  let fileList: File[] = [];
  
  try {
    const files: string[] = fs.readdirSync(dir);
  
    for (const file of files) {
      const filePath: string = path.join(dir, file);
  
      if (fs.statSync(filePath).isDirectory()) {
        fileList = fileList.concat(getFileList(filePath, reg));
      } else {
        if (reg.test(file)) {
          fileList.push({ path: filePath });
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