# Документация к коду для парсинга HTML и работы с файлами

Этот файл содержит код для парсинга HTML файлов с использованием библиотеки `jsdom` и для выполнения операций с файлами, таких как удаление файлов и запись информации в другие файлы. Основная цель — извлечь определенные данные из HTML-документа и сохранить их.

## Импортируемые модули

- **`JSDOM` из `jsdom`**: Библиотека для создания виртуального DOM (Document Object Model) в Node.js, что позволяет работать с HTML-документами как с обычными объектами в JavaScript.
- **`fs`**: Модуль для работы с файловой системой, используемый для чтения, записи и удаления файлов.
- **`path`**: Модуль для работы с путями файлов и каталогов. В этом случае используется для определения расширения файлов.
- **`writeInfo`**: Функция, которая записывает извлеченную информацию в какой-то внешний источник (например, файл или базу данных).

## Описание функций

### Функция `deleteFile`

```javascript
const deleteFile = async (filePath) => {
    try {
      await fs.promises.unlink(filePath);   
    } catch (err) {
      console.error('Ошибка при удалении файла:', err);
    }
};
```

- **Описание**: Удаляет файл по заданному пути `filePath`.
- **Параметры**:
  - `filePath`: Путь к файлу, который нужно удалить.
- **Возвращаемое значение**: Функция ничего не возвращает.
- **Обработка ошибок**: Если файл не удается удалить, выводится ошибка в консоль.

### Функция `parseFile`

```javascript
export const parseFile = (file, filePath) => {
    const dom = new JSDOM(file);
    const document = dom.window.document;

    writeInfo(
        document.querySelector(".ltr-183yg4m-Body-Heading-HeadingBold")?.textContent,
        document.querySelector(".ltr-13ze6d5-Body")?.textContent,
        document.querySelector("._fdc1e5")?.textContent,
        document.querySelector(".ltr-s7112i-Heading")?.textContent,
        document.querySelectorAll('.ltr-1w2up3s'),
        filePath
    );
    deleteFile(filePath);
};
```

- **Описание**: Эта функция парсит переданный HTML файл, извлекает несколько элементов из DOM и сохраняет их, а затем удаляет исходный файл.
- **Параметры**:
  - `file`: HTML содержимое файла в виде строки.
  - `filePath`: Путь к исходному файлу, который будет удален после парсинга.
- **Возвращаемое значение**: Функция ничего не возвращает, но выполняет два действия:
  1. Извлекает данные из HTML с помощью `JSDOM` и записывает их с помощью функции `writeInfo`.
  2. Удаляет исходный файл после парсинга.

### Логика работы

1. **Создание виртуального DOM**: 
   - В начале, с помощью `JSDOM`, создается виртуальный DOM из переданного HTML содержимого (переменная `file`).
   - Далее, с помощью `document.querySelector` извлекаются различные элементы HTML:

     - **Заголовок с классом `.ltr-183yg4m-Body-Heading-HeadingBold`**: Заголовок, вероятно, важный для парсинга.
     - **Основной текст с классом `.ltr-13ze6d5-Body`**: Текст, связанный с контентом.
     - **Информация с класса `._fdc1e5`**: Может быть дополнительной информацией, например, подзаголовок.
     - **Заголовок с классом `.ltr-s7112i-Heading`**: Еще один заголовок.
     - **Элементы с классом `.ltr-1w2up3s`**: Это все элементы с указанным классом, которые извлекаются с помощью `querySelectorAll`.
     
2. **Запись информации**:
   - Извлеченные данные передаются в функцию `writeInfo`, которая записывает эти данные в нужное место (например, файл или базу данных).

3. **Удаление файла**:
   - После того как все необходимые данные были извлечены и записаны, исходный файл удаляется с помощью функции `deleteFile`.

## Пример использования

```javascript
import { parseFile } from './path/to/your/file';

// Пример HTML данных
const fileContent = `
<html>
  <body>
    <h1 class="ltr-183yg4m-Body-Heading-HeadingBold">Заголовок 1</h1>
    <p class="ltr-13ze6d5-Body">Основной текст</p>
    <div class="ltr-s7112i-Heading">Заголовок 2</div>
    <p class="ltr-1w2up3s">Детали 1</p>
    <p class="ltr-1w2up3s">Детали 2</p>
  </body>
</html>
`;

const filePath = './path/to/file.html';

// Парсинг и удаление файла
parseFile(fileContent, filePath);
```

## Примечания

- **Функция `writeInfo`**: Для полного понимания работы кода важно знать, как работает функция `writeInfo`, которая не описана в данном файле. Она предполагается как часть внешней логики, которая отвечает за запись данных.
- **Удаление файла**: Важно, чтобы файл был удален только после того, как вся необходимая информация была извлечена и записана.

## Зависимости

- **`jsdom`**: Библиотека для работы с виртуальным DOM в Node.js.

```bash
npm install jsdom
```

- **`fs`**: Встроенный модуль Node.js для работы с файловой системой.

```bash
// No need to install, it's built into Node.js
```
