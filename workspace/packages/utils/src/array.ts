export function hasArrayDiff<T>(a?: T[], b?: T[]) {
  if (a === b) {
    return false;
  }
  if (a === undefined || b === undefined) {
    return true;
  }
  if (a.length !== b.length) {
    return true;
  }
  return !a.every(item => b.includes(item));
}
