export const regexpOr = (
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
