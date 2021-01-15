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

/**
 * Split a string into substrings using the specified separator and return them as an array.
 * Empty strings in the array are excluded.
 *
 * @param {string} str A target string.
 * @param {string | RegExp} separator A string that identifies character or characters to use in separating the string.
 * @return {string} An array of strings split by the specified separator.
 */
export const splitAndTrim = (
  str: string,
  separator: string | RegExp
): string[] => {
  return str
    .split(separator)
    .map((v) => v.trim())
    .filter(Boolean);
};
