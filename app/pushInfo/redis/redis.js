import Redis from 'ioredis';
import dotenv from 'dotenv';
import { logger } from '../../logger/logger.js'; 
dotenv.config();
export const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
});
export const SaveInfoRedis = (products) =>{
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