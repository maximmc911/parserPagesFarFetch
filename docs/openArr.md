# Документация к коду для распаковки архивов

Этот файл содержит функции для распаковки различных типов архивных файлов, таких как `.tar.gz`, `.zip`, `.7z`, и других. Также обеспечивается логирование успеха или ошибок при распаковке файлов.

## Импортируемые модули

- **`fs`**: Модуль для работы с файловой системой, используемый для чтения и записи файлов.
- **`path`**: Модуль для работы с путями файлов и каталогов.
- **`logger`**: Логгер, настроенный в другом файле для записи логов (см. [логгер](../../log/log.js)).
- **`AdmZip`**: Библиотека для работы с `.zip` архивами.
- **`tar`**: Библиотека для работы с `.tar` и `.tar.gz` архивами.
- **`Seven`**: Библиотека для работы с `.7z` архивами.
- **`bin`**: Путь к бинарным файлам `7z` для использования с библиотекой `Seven`.

## Описание функций

### Функция `makeListArray`

```javascript
export const makeListArray = (filePath, outputPath) => {
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
    }
    const folderArray = fs.readdirSync(filePath);
    folderArray.forEach((el) => openArray(el, outputPath, filePath));
}
```

- **Описание**: Эта функция создает каталог для распаковки, если его еще нет, и вызывает функцию `openArray` для каждого элемента в указанной директории.
- **Параметры**:
  - `filePath`: Путь к папке, где находятся архивные файлы.
  - `outputPath`: Путь к папке, куда будут распаковываться файлы.
- **Возвращаемое значение**: Функция ничего не возвращает, но вызывает функцию `openArray` для каждого файла в указанной директории.

### Функция `openArray`

```javascript
export function openArray(array, outputPath, filePath) {
    const extArr = path.extname(array).toLowerCase();
    switch (extArr) {
        case '.gz':
        case '.tar.gz':
            try {
                extractTar({ file: `${filePath}/${array}`, C: outputPath })
                    .then(() => {
                        logger.success({
                            nameArray: array,
                            filePath: `${filePath}/${array}`,
                            description: `успешно распакован .tar/.tar.gz файл`
                        });
                    })
                    .catch((err) => logger.error({
                        nameArray: array,
                        filePath: `${filePath}/${array}`,
                        description: 'Ошибка при извлечении .tar/.tar.gz архива:'
                    }));
                break;
            } catch (error) {
                logger.error({
                    nameArray: array,
                    filePath: `${filePath}/${array}`,
                    description: `не удалось распаковать .gz/.tar.gz файл`
                });
            }
            break;
        case '.zip':
            try {
                new AdmZip(`${filePath}/${array}`).extractAllTo(outputPath, true);
                logger.success({
                    nameArray: array,
                    filePath: `${filePath}/${array}`,
                    description: `успешно распакован .zip файл`
                });
            } catch (error) {
                logger.error({
                    nameArray: array,
                    filePath: `${filePath}/${array}`,
                    description: `не удалось распаковать .zip файл`
                });
            }
            break;
        case '.rar':
            try {
                logger.error({
                    nameArray: array,
                    filePath: `${filePath}/${array}`,
                    description: `не удалось распаковать .rar файл`
                });
            } catch (error) {
                logger.error({
                    nameArray: array,
                    filePath: `${filePath}/${array}`,
                    description: `не удалось распаковать .rar файл`
                });
            }
            break;
        case '.7z':
            try {
                const options = {
                    $bin: bin.path7za,
                    $progress: true
                };
                const myStream = Seven.extract(`${filePath}/${array}`, outputPath, options);

                myStream.on('end', () => {
                    logger.success({
                        nameArray: array,
                        filePath: `${filePath}/${array}`,
                        description: `успешно распакован .7z файл`
                    });
                });

                myStream.on('error', (err) => {
                    logger.error({
                        nameArray: array,
                        filePath: `${filePath}/${array}`,
                        description: `не удалось распаковать .7z файл`
                    });
                });
            } catch (error) {
                logger.error({
                    nameArray: array,
                    filePath: `${filePath}/${array}`,
                    description: `не удалось распаковать .7z файл`
                });
            }
            break;
        default:
            logger.error({
                nameArray: array,
                filePath: `${filePath}/${array}`,
                description: `неизвестное разрешение архива`
            });
            break;
    }
}
```

- **Описание**: Эта функция распаковывает архивы в зависимости от их расширения. Она поддерживает различные типы архивов: `.tar.gz`, `.zip`, `.rar`, и `.7z`. При успешной распаковке выводится сообщение в лог, а в случае ошибки — сообщение об ошибке.
- **Параметры**:
  - `array`: Имя архива, который нужно распаковать.
  - `outputPath`: Путь к папке, куда будут распакованы файлы.
  - `filePath`: Путь к папке, где находится архив.
- **Типы поддерживаемых архивов**:
  - **`.tar.gz` и `.gz`**: Распаковка с использованием библиотеки `tar`.
  - **`.zip`**: Распаковка с использованием библиотеки `AdmZip`.
  - **`.rar`**: Сообщение об ошибке (распаковка `.rar` не поддерживается в данном коде).
  - **`.7z`**: Распаковка с использованием библиотеки `node-7z`.
- **Возвращаемое значение**: Функция ничего не возвращает, но вызывает логи для успеха и ошибок.

## Пример использования

```javascript
import { makeListArray } from './path/to/your/file';

// Путь к папке с архивами
const filePath = './path/to/archives';
// Путь к папке, куда будут распакованы архивы
const outputPath = './path/to/extracted';

// Запуск распаковки
makeListArray(filePath, outputPath);
```

## Примечания

- Архивы с расширением `.rar` не могут быть распакованы в данном коде, и для них всегда будет выводиться сообщение об ошибке.
- Для работы с `.7z` архивами требуется наличие бинарного файла `7za`, который используется через библиотеку `node-7z`.
- Для правильной работы убедитесь, что все зависимые библиотеки установлены.

## Зависимости

- **`adm-zip`**: Для работы с `.zip` архивами.

```bash
npm install adm-zip
```

- **`tar`**: Для работы с `.tar` и `.tar.gz` архивами.

```bash
npm install tar
```

- **`node-7z`**: Для работы с `.7z` архивами.

```bash
npm install node-7z
```
