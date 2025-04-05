import { makeListArray } from "./components/openArr.js"
import fs, { readFile as _readFile } from 'fs';
import { extname as _extname } from 'path';
import { parseFile } from "./components/parseFile/parseFile.js";
import { logger } from "../log/log.js";
import path from 'path'
export const ParseFolder = (folderPath) =>{
  const files = fs.readdirSync(folderPath)
  files.forEach(file => {
    readFile(`${folderPath}/${file}`)
  });
}
export function readFile(filePath) {
  const extname = _extname(filePath).toLowerCase();
  if (!extname) {
    // console.log(`Чтение файла без расширения: ${filePath}`);
    _readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        logger.error({
                      filePath: filePath,
                      description:`Ошибка при извлечении данных c файла , ${err}`
                  })

        console.error('Ошибка при чтении файла:', err);
      } else {
        parseFile(data , filePath)
      }
    });
  } else {
    // console.log(`Чтение файла с расширением: ${filePath}`);
    const newFilePath = path.join(path.dirname(filePath), path.basename(filePath, path.extname(filePath)));

    // Переименование файла
    fs.rename(filePath, newFilePath, (err) => {
      if (err) {
        console.error('Ошибка переименования:', err);
      } else {

        _readFile(newFilePath, 'utf8', (err, data) => {
          if (err) {
            logger.error({
              filePath: newFilePath,
              description:`Ошибка при извлечении данных c файла , ${err}`
          })
            console.error('Ошибка при чтении файла:', err);
          } else {
            parseFile(data , newFilePath)
          }
      });
      }
    });
  }
}

export const workingFile = () =>{
  makeListArray(pathFolderinArray ,  outputPathFolderinArray )

}