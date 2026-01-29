export const getProperty = (obj, path) => {
  // return path.split('.').reduce((o, p) => (o ? o[p] : undefined), obj);
  if (!obj || !path) return undefined;
  const properties = path.split(".");
  let current = obj;
  for (let i = 0; i < properties.length; i++) {
    if (current[properties[i]] === undefined) {
      return undefined;
    } else {
      current = current[properties[i]];
    }
  }
  return current;
};
