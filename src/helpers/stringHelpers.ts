/**
 * Decode character entity references.
 *
 * ex) `abc&#x30b5;&#x30f3;&#x30d7;&#x30eb;` => `abcサンプル`
 *
 * @param {string} text A string containing character entity references.
 * @return {string} A decoded string.
 */
export const decodeEntityReferences = (text: string): string => {
  return text.replace(/&#x(\w+?);/g, (_, char) => {
    return String.fromCharCode(parseInt(char, 16));
  });
};

/**
 * Get a value that matches the regular expression from the target string. If there is no matching value, it returns the substitute string.
 *
 * @param {string} text A search target.
 * @param {RegExp} regExp Regular expression.
 * @param {number} index Index of the array you want to retrieve from the results that match the regular expression. Default value is 0.
 * @param {string} substitute If there is no matching the regular expression, returns this value. Default value is ''.
 * @return {string} A string that matches the regular expression. If there is no matching value, it returns the substitute string.
 */
export const regExpOr = (
  target: string,
  regExp: RegExp,
  index = 0,
  substitute = ''
): string => {
  const result = target.match(regExp);
  if (result && result.length > index) {
    return result[index];
  }
  return substitute;
};
