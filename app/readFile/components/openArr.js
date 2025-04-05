import fs ,  { readFile as _readFile }  from 'fs'
import path ,  { extname as _extname } from 'path'
import { logger } from '../../log/log.js'
import AdmZip from 'adm-zip';
import { x as extractTar } from 'tar';
import Seven from 'node-7z';
import bin from '7zip-bin';


export const makeListArray =(filePath ,  outputPath ) => {
if (!fs.existsSync( outputPath )) {
  fs.mkdirSync( outputPath , { recursive: true });
}
    const folderArray = fs.readdirSync(filePath)
 folderArray.forEach((el) => openArray(el ,  outputPath , filePath ))
    
}


export function openArray ( array , outputPath , filePath ){
const extArr = path.extname(array).toLowerCase()
switch (extArr) {
    case '.gz':
        case '.tar.gz':
            try {            
                extractTar({ file: `${filePath}/${array}`, C: outputPath })
                .then(()=>{
                    logger.success({
                        nameArray: array,
                        filePath: `${filePath}/${array}`,
                        description: `успешно распакован .tar/.tar.gz  файл`
                    })
                })
            .catch((err) => logger.error({
                nameArray: array,
                filePath: `${filePath}/${array}`,
                description:'Ошибка при извлечении .tar/.tar.gz архива:'
            }));
          break;
            } catch (error) {
                logger.error({
                    nameArray: array,
                    filePath: `${filePath}/${array}`,
                    description: `не удалось распаковать .gz/.tar.gz  файл`
                })
            }
            
            break;
            
    case '.zip':
        try {
         new AdmZip(`${filePath}/${array}`).extractAllTo(outputPath, true); 
         logger.success({
            nameArray: array,
            filePath: `${filePath}/${array}`,
            description: `успешно распакован .zip файл`
        })
        } catch (error) {
            logger.error({
                nameArray: array,
                filePath: `${filePath}/${array}`,
                description: `не удалось распаковать .zip файл`
            })
        } 
        break;
    case '.rar':    
        try {
            logger.error({
                nameArray: array,
                filePath: `${filePath}/${array}`,
                description: `не удалось распаковать .rar файл`
            })
            
         
        } catch (error) {
            console.log(`catch`);
            
            logger.error({
                nameArray: array,
                filePath: `${filePath}/${array}`,
                description: `не удалось распаковать .rar файл`
            })
            
        }
        break;
    case '.7z':
      try {
          const options = {
            $bin: bin.path7za, 
            $progress: true
          };
          const myStream = Seven.extract(`${filePath}/${array}`, outputPath, options);
// ? если необходима более подробная информация по процессу распаковки
/* myStream.on('progress', (files) => {
  console.log('Извлечены файлы:', files);
});

*/
myStream.on('end', () => {
    logger.success({
        nameArray: array,
        filePath: `${filePath}/${array}`,
        description: `успешно распакован .7z файл`
    })
});

myStream.on('error', (err) => {
    logger.error({
        nameArray: array,
        filePath: `${filePath}/${array}`,
        description: `не удалось распаковать .7z  файл`
    })
});
        
      } catch (error) {
        logger.error({
            nameArray: array,
            filePath: `${filePath}/${array}`,
            description: `не удалось распаковать .7z  файл`
        })
      }
        
        break;



    default:
        logger.error({
            nameArray: array,
            filePath: `${filePath}/${array}`,
            description: `неизвестное разрешение архива`
        })
        break;
}
}