# Документация проекта

Этот проект содержит функциональность для обработки и анализа данных о продуктах, включая их извлечение, парсинг, сохранение в Redis и логирование.

## Содержание

1. [Функции работы с файлами](#функции-работы-с-файлами)
2. [Парсинг и обработка данных](#парсинг-и-обработка-данных)
3. [Работа с архивами](#работа-с-архивами)
4. [Работа с Redis](#работа-с-redis)
5. [Миксины и вспомогательные функции](#миксины-и-вспомогательные-функции)
6. [Логирование](#логирование)
7. [Установка и настройка](#установка-и-настройка)

## Функции работы с файлами

- **`parseFile`** — Парсинг HTML-файлов и извлечение данных.
    - Документация: [parseFile](docs/parseFile.md)

- **`writeInfo`** — Функция для сбора и записи данных о продукте в лог.
    - Документация: [writeInfo](docs/writeInfo.md)

## Парсинг и обработка данных

- **`conventorPrice`** — Преобразование строки с ценой в число.
    - Документация: [conventorPrice](docs/conventorPrice.md)

- **`conventorDescription`** — Преобразование описания продукта в нужный формат.
    - Документация: [conventorDescription](docs/conventorDescription.md)

- **`generateUniqueId`** — Генерация уникального идентификатора.
    - Документация: [generateUniqueId](docs/generateUniqueId.md)

- **`isValidName`** — Проверка и форматирование имени продукта.
    - Документация: [isValidName](docs/isValidName.md)

- **`makeCollectionPhoto`** — Извлечение изображений из HTML-блока.
    - Документация: [makeCollectionPhoto](docs/makeCollectionPhoto.md)

- **`MakePriceFarFetch`** — Извлечение и преобразование цены из строки.
    - Документация: [MakePriceFarFetch](docs/MakePriceFarFetch.md)

## Работа с архивами

- **`makeListArray`** — Сканирование директории и распаковка архивов.
    - Документация: [makeListArray](docs/makeListArray.md)

- **`openArray`** — Открытие и распаковка различных типов архивов (.tar, .zip, .gz, .7z).
    - Документация: [openArray](docs/openArray.md)

## Работа с Redis

- **`SaveInfoRedis`** — Сохранение данных о продукте в Redis.
    - Документация: [SaveInfoRedis](docs/SaveInfoRedis.md)

## Миксины и вспомогательные функции

- **`conventors`** — Набор вспомогательных функций для обработки и преобразования данных (цены, описания, изображения).
    - Документация: [conventors](docs/conventors.md)

## Логирование

- **`logger`** — Модуль для логирования данных о выполнении процессов, успешных операциях и ошибках.
    - Документация: [logger](docs/logger.md)

## Установка и настройка

1. Клонируйте репозиторий:
    ```bash
    git clone https://github.com/your-repository.git
    ```

2. Установите зависимости:
    ```bash
    npm install
    ```

3. Настройте переменные окружения в `.env` файле, например:
    ```
    REDIS_HOST=localhost
    REDIS_PORT=6379
    REDIS_PASSWORD=yourpassword
    ```

4. Запустите приложение:
    ```bash
    npm start
    ```

5. Для тестирования функций, используйте [ссылки на документацию](docs).

## Лицензия

Этот проект лицензирован под MIT License.
```

### Объяснение:

1. В разделе **Содержание** указаны все ключевые разделы проекта, и для каждой из функций добавлены ссылки на соответствующие файлы документации в папке `docs`. Пример структуры проекта:

```
project-root/
├── docs/
│   ├── parseFile.md
│   ├── writeInfo.md
│   ├── conventorPrice.md
│   ├── conventorDescription.md
│   ├── generateUniqueId.md
│   ├── isValidName.md
│   ├── makeCollectionPhoto.md
│   ├── MakePriceFarFetch.md
│   ├── makeListArray.md
│   ├── openArray.md
│   ├── SaveInfoRedis.md
│   └── logger.md
├── src/
│   ├── components/
│   └── log/
└── README.md
```
