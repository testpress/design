function groupBy(arr = [], keyPath = "") {
  const keys = keyPath.split(".");

  return arr.reduce((acc, item) => {
    // Traverse the object using the keys array to get the value at the keyPath
    let groupKey = item;
    for (const key of keys) {
      if (groupKey && key in groupKey) {
        groupKey = groupKey[key];
      } else {
        groupKey = null; // Key path doesn't exist
        break;
      }
    }

    // If the groupKey is valid, group the item
    if (groupKey) {
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(item);
    }

    return acc;
  }, {});
}

module.exports = groupBy;
