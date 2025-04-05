import { JSDOM } from "jsdom";

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

export const generateUniqueId = (idSelector='') => {
  try {
    if (idSelector.trim().length > 0) {
      return idSelector.trim();
    }
    return `${Date.now().toString(36)}-${Math.random()
      .toString(36)
      .substring(2, 8)}`;
  } catch (error) {
    console.error(error);

    return `${Date.now().toString(36)}-${Math.random()
      .toString(36)
      .substring(2, 8)}`;
  }
};
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

export const MakePriceFarFetch = (price = null)=>{
  try {
    if (price === null || price === undefined) {
      return 'не указано'
    }
  const priceText = price.trim().substring(1);
 let priceNumber ='';
for (let index = 0; index < priceText.length; index++) {
if (priceText[index] !== '.' && priceText[index] !== ',') {
  priceNumber += priceText[index]
}}
  return Number(priceNumber)
  } catch (error) {
    console.error(error);
    return 'не указано'
    
  }
}

export const makeCollectionPhoto = (htmlBlock = null)=>{
  try {
    if (htmlBlock === null || htmlBlock === undefined) {   
      return [] 
    }
    const images = [];
    htmlBlock.forEach((el)=> {
      if (el.src.length >0) {
        images.push(el.src)
      }
    })
   return images
  } catch (error) {
    console.error(error);
    return []
  }
}
