module.exports = function cleaner(input) {
  input = JSON.parse(JSON.stringify(input))
  // make shallow copy of input to remove reference
  const output = {};
  // clean up "css_args" as it takes a lot of useless space
  input.params.data.selectorArray.forEach((e, i, a) => {
    // modifies original array
    a[i].css_args = '';
  });
  return input;
};
