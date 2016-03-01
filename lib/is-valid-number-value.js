module.exports = function isValidNumberValue (value) {
  var MIN = 0
  var MAX = 2147483647

  /* eslint-disable no-self-compare */
  // self compare is to check for NaN
  if (value !== value || value < MIN || value > MAX) {
    return false
  }
  else {
    return true
  }
  /* eslint-enable no-self-compare */
}
