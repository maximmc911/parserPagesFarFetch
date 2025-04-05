# Документация к коду для обработки данных

Этот файл содержит функции для обработки строк и данных, таких как конвертация цен, описание, создание уникальных идентификаторов, а также извлечение и обработка информации о характеристиках и фотографиях.

## Описание функций

### Функция `conventorPrice`

```javascript
export const conventorPrice = (str) => {
  try {
    if (str.length > 0) {
      let number = "";
      let string = str.trim().slice(0, str.trim().length - 2);
      for (let index = 0; index < string.length; index++) {
        Number(string[index]) ? (number += string[index]) : null;
      }
      return Number(number);
    } else {
      return "не указано";
    }
  } catch (error) {
    console.error(error);

    return "не указано";
  }
};
```

- **Описание**: Функция извлекает числовую часть из строки, представляющей цену, и возвращает её в виде числа. Если строка пустая или в ней нет чисел, возвращается значение `"не указано"`.
- **Параметры**:
  - `str`: Строка, представляющая цену. Обычно в строке цена сопровождается валютой (например, "100 USD").
- **Возвращаемое значение**: Возвращает число, представляющее цену, или строку `"не указано"`, если данные некорректны.

### Функция `conventorDescription`

```javascript
export const conventorDescription = (str, bool = true) => {
  try {
    if (str !== undefined) {
      if (str.trim().length > 0) {
        return bool ? str.trim().slice(0, str.trim().length - 10) : str.trim();
      }
    }
    return "не указано";
  } catch (error) {
    console.error(error);
    return "не указано";
  }
};
```

- **Описание**: Функция обрабатывает строку с описанием, обрезая последние 10 символов, если параметр `bool` равен `true`. Если строка пустая или некорректная, возвращается строка `"не указано"`.
- **Параметры**:
  - `str`: Строка с описанием.
  - `bool` (необязательный): Флаг, который определяет, следует ли обрезать последние 10 символов. По умолчанию `true`.
- **Возвращаемое значение**: Возвращает обрезанное описание или `"не указано"`, если описание пустое или некорректное.

### Функция `generateUniqueId`

```javascript
export const generateUniqueId = (idSelector='') => {
  try {
    if (idSelector.trim().length > 0) {
      return idSelector.trim();
    }
    return `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 8)}`;
  } catch (error) {
    console.error(error);
    return `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 8)}`;
  }
};
```

- **Описание**: Генерирует уникальный идентификатор. Если передан параметр `idSelector`, то возвращается этот параметр. Если параметр пуст, генерируется новый идентификатор на основе текущего времени и случайного числа.
- **Параметры**:
  - `idSelector`: Строка, которая будет использована как идентификатор. Если строка пуста, генерируется уникальный идентификатор.
- **Возвращаемое значение**: Уникальный идентификатор в виде строки.

### Функция `isValidName`

```javascript
export const isValidName = (name) => {
  try {
    if (name === undefined) {
      return `не указано`;
    }
    if (name.trim().length > 0) {
      return name.trim();
    }
    return `не указано`;
  } catch (error) {
    console.error(error);
    return `не указано`;
  }
};
```

- **Описание**: Проверяет валидность строки с именем. Если строка пустая или `undefined`, возвращается `"не указано"`. Если строка непустая, возвращается сама строка.
- **Параметры**:
  - `name`: Строка с именем.
- **Возвращаемое значение**: Возвращает строку с именем или `"не указано"`, если имя пустое или некорректное.

### Функция `MakeModelSpecifications`

```javascript
export const MakeModelSpecifications = (blockHtml = null) => {
  const modelSpecifications = [];
  if (!blockHtml) return modelSpecifications;

  try {
    blockHtml.childNodes.forEach((childNode, index) => {
      if (childNode.nodeType === 1) {
        const dom = new JSDOM(childNode.outerHTML);
        const document = dom.window.document;
        modelSpecifications.push({
          nameCategory: document
            .querySelector(".product-characteristics__group-title")
            .textContent.trim(),
        });
        document
          .querySelector(".product-characteristics__specs-list")
          .childNodes.forEach((child) => {
            const dom = new JSDOM(child.outerHTML);
            const document = dom.window.document;
            modelSpecifications[index][
              document
                .querySelector(".product-characteristics__spec-title-content")
                .textContent.trim()
            ] = document
              .querySelector(".product-characteristics__spec-value")
              .textContent.trim();
          });
      }
    });

    return modelSpecifications;
  } catch (error) {
    console.error(error);
    return modelSpecifications;
  }
};
```

- **Описание**: Функция извлекает характеристики модели из HTML-блока. Каждая характеристика представлена в виде объекта с названием категории и характеристиками.
- **Параметры**:
  - `blockHtml`: HTML-элемент, содержащий характеристики модели.
- **Возвращаемое значение**: Массив объектов, представляющих характеристики модели.

### Функция `MakePriceFarFetch`

```javascript
export const MakePriceFarFetch = (price = null) => {
  try {
    if (price === null || price === undefined) {
      return 'не указано';
    }
    const priceText = price.trim().substring(1);
    let priceNumber = '';
    for (let index = 0; index < priceText.length; index++) {
      if (priceText[index] !== '.' && priceText[index] !== ',') {
        priceNumber += priceText[index];
      }
    }
    return Number(priceNumber);
  } catch (error) {
    console.error(error);
    return 'не указано';
  }
};
```

- **Описание**: Функция извлекает числовое значение из строки цены, удаляя символ валюты и нецифровые символы.
- **Параметры**:
  - `price`: Строка, представляющая цену.
- **Возвращаемое значение**: Числовое значение цены или строка `"не указано"`, если цена некорректна.

### Функция `makeCollectionPhoto`

```javascript
export const makeCollectionPhoto = (htmlBlock = null) => {
  try {
    if (htmlBlock === null || htmlBlock === undefined) {   
      return []; 
    }
    const images = [];
    htmlBlock.forEach((el) => {
      if (el.src.length > 0) {
        images.push(el.src);
      }
    });
    return images;
  } catch (error) {
    console.error(error);
    return [];
  }
};
```

- **Описание**: Извлекает ссылки на изображения из HTML-блока.
- **Параметры**:
  - `htmlBlock`: Массив HTML-элементов, содержащих изображения.
- **Возвращаемое значение**: Массив строк, представляющих URL-адреса изображений.

## Примечания

- В коде используются библиотеки, такие как `JSDOM` для парсинга HTML.
- Все функции имеют обработку ошибок, которая записывает ошибку в консоль и возвращает значение по умолчанию (например, `"не указано"`).
