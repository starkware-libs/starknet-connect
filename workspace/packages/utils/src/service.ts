export function convertPackageNameToServiceName(value: string) {
  return value.split('@')[1].split('/').join('_');
}
