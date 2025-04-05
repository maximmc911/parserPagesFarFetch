import { logger } from "../log/log.js";
import { conventorDescription, generateUniqueId, isValidName, makeCollectionPhoto, MakePriceFarFetch } from "./components/mixin/conventors.js"

export const writeInfo = (...info) =>{
    try {
        const product ={
            id: generateUniqueId(),
            name: isValidName(info[0]),
            product: conventorDescription(info[1], false),
            description: conventorDescription(info[2], false),
            price: MakePriceFarFetch(info[3]),
            image : makeCollectionPhoto(info[4]),
        }
        logger.success({
            message: `Данные собраны`,
            file: info[info.length - 1],
            data: product,
        })
    return product
        
    } catch (error) {
        console.log(error);
        logger.error({
            error: error,
            message: `Ошибка в сборе данных продукта`,
            data: info[info.length - 1],
        })
    }
}
