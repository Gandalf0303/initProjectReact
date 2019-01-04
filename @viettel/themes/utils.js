export const hyphensToUnderscores = sourceObj => {
  const translated = {};

  /* Create hypened versions */
  for (let key in sourceObj) {
    translated[key.replace(/-/g, '_')] = sourceObj[key];
  }

  return translated;
};

export const mapValue = (object, iteratee) => {
 object = Object(object);
 const result = {};

 Object.keys(object).forEach(key => {
   result[key] = iteratee(object[key], key, object);
 });
 return result;
};