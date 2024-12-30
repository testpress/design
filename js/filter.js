function filter(arr = [], keyPath = "", value) {
  const keys = keyPath.split(".");

  return arr.filter(item => {
    let keyValue = item;
    for (const key of keys) {
      keyValue = keyValue[key];
    }

    // Check if the key's value matches the provided value
    return keyValue === value;
  });
}

module.exports = filter;
