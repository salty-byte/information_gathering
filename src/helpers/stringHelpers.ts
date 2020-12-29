/**
 * Decode character entity references.
 *
 * ex) `abc&#x30b5;&#x30f3;&#x30d7;&#x30eb;` => `abcサンプル`
 *
 * @param {string} text A string containing character entity references
 * @return {string} A decoded string
 */
export const decodeEntityReferences = (text: string): string => {
  return text.replace(/&#x(\w+?);/g, (_, char) => {
    return String.fromCharCode(parseInt(char, 16));
  });
};

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
