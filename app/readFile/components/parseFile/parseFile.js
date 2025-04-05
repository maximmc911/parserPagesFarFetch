import { JSDOM } from "jsdom";
import fs  , { readFile as _readFile }  from 'fs'
import { extname as _extname } from 'path';
import { writeInfo } from "../../../writeInfo/writeInfo.js";

const deleteFile = async (filePath) => {
    try {
      await fs.promises.unlink(filePath);   
    } catch (err) {
      console.error('Ошибка при удалении файла:', err);
    }
  };
  
export const parseFile = (file , filePath) =>{
    const dom = new JSDOM(file);
    const document = dom.window.document;

writeInfo(document.querySelector(".ltr-183yg4m-Body-Heading-HeadingBold")?.textContent,
document.querySelector(".ltr-13ze6d5-Body")?.textContent ,
document.querySelector("._fdc1e5")?.textContent,
document.querySelector(".ltr-s7112i-Heading")?.textContent,
document.querySelectorAll('.ltr-1w2up3s') , filePath ),
deleteFile(filePath)
}
