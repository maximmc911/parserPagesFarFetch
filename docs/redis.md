# Документация к коду для работы с Redis

Этот файл содержит код для подключения к Redis и записи данных в базу данных Redis. Он использует библиотеку `ioredis` для работы с Redis и библиотеку `dotenv` для загрузки конфигурации из файла `.env`. Для логирования используется уже настроенный логгер.

## Импортируемые модули

- `ioredis`: Библиотека для работы с Redis.
- `dotenv`: Библиотека для загрузки конфигурации из файла `.env`.
- `logger`: Логгер, настроенный в другом файле для записи логов (см. [логгер](../../logger/logger.js)).

## Инициализация подключения к Redis

```javascript
export const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    db: process.env.REDIS_DB,
});
```

- **Описание**: Подключение к Redis с использованием данных из файла конфигурации `.env`. Устанавливаются параметры:
  - `host`: Адрес Redis-сервера.
  - `port`: Порт, на котором работает Redis.
  - `password`: Пароль для подключения (если требуется).
  
- **Переменные окружения**:
  - `REDIS_HOST`: Адрес Redis-сервера.
  - `REDIS_PORT`: Порт Redis.
  - `REDIS_PASSWORD`: Пароль Redis (если используется).

### Пример `.env` файла:

```env
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=yourpassword
```

## Функция для сохранения данных в Redis

```javascript
export const SaveInfoRedis = (products) => {
    async function saveData(key, value) {
      try {
        await redis.set(key, value); // Записываем данные
        console.log(`Данные с ключом "${key}" успешно записаны в Redis!`);
        logger.success({
          message: `Данные с ключом "${key}" успешно записаны в Redis!`,
          data: products,
        })
      } catch (error) {
        console.error('Ошибка при записи данных в Redis:', error);
        logger.error({
          message: 'Ошибка при записи данных в Redis',
          error: error,
          data: products,
        })
      }
    }
    saveData(`${products.id}`, `${JSON.stringify(products)}`);
    redis.quit();
}
```

### Описание:

Функция `SaveInfoRedis` выполняет следующие задачи:

1. **Принимает данные**:
   - В качестве параметра получает объект `products` — данные продукта, которые будут сохранены в Redis.

2. **Функция `saveData`**:
   - Асинхронная функция, которая записывает данные в Redis с использованием метода `redis.set`.
   - Записывает данные в формате `JSON.stringify(products)` с ключом, равным `products.id`.
   - После успешной записи данных в Redis выводится сообщение в консоль, и также записывается лог с помощью логгера (`logger.success`).

3. **Обработка ошибок**:
   - В случае ошибки при записи данных в Redis выводится сообщение об ошибке в консоль, а также логируется ошибка с помощью логгера (`logger.error`).

4. **Закрытие соединения с Redis**:
   - После завершения операции соединение с Redis закрывается методом `redis.quit()`.

### Параметры:

- **`products`**: Объект, содержащий информацию о продукте, который нужно сохранить в Redis. Пример:

  ```javascript
  const product = {
    id: 1,
    name: "Product Name",
    price: 100,
  };
  ```

### Пример использования:

```javascript
import { SaveInfoRedis } from './path/to/your/file';

// Пример данных продукта
const product = {
  id: 1,
  name: "Product A",
  price: 200,
};

// Сохранение данных в Redis
SaveInfoRedis(product);
```

## Логирование

Для успешных операций используется метод `logger.success`, а для ошибок — `logger.error`. Логи содержат информацию о процессе записи данных в Redis, а также сам объект продукта (`products`).

### Пример логов:

- Успешный лог:

  ```json
  {
    "message": "Данные с ключом \"1\" успешно записаны в Redis!",
    "data": { "id": 1, "name": "Product A", "price": 200 }
  }
  ```

- Лог ошибки:

  ```json
  {
    "message": "Ошибка при записи данных в Redis",
    "error": "Error: Redis connection failed...",
    "data": { "id": 1, "name": "Product A", "price": 200 }
  }
  ```

## Примечания

- Перед использованием этого кода убедитесь, что файл `.env` содержит правильные данные для подключения к Redis.
- Важно, чтобы Redis был доступен на указанном хосте и порте.
- После выполнения операции подключения и записи данных соединение с Redis закрывается методом `redis.quit()`.

## Зависимости

- **`ioredis`**: Библиотека для работы с Redis.

```bash
npm install ioredis
```

- **`dotenv`**: Библиотека для загрузки переменных окружения из файла `.env`.

```bash
npm install dotenv
```
