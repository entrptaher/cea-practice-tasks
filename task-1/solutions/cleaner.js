module.exports = function cleaner(input) {
  input.params.data.selectorArray.forEach((e, i, a) => {
    a[i].css_args = '';
  });
  return input;
};
