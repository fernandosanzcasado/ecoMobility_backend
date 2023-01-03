const jaccardIndex = (string1, string2) => {
  if (!string1 || !string2) return 0;

  var set1 = [...new Set(string1.toUpperCase().split(""))];
  var set2 = [...new Set(string2.toUpperCase().split(""))];

  var intersection = set1.filter((x) => set2.includes(x));
  var union = [...new Set([...set1, ...set2])];

  return intersection.length / union.length;
};

module.exports = jaccardIndex;
