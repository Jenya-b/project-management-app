export function makeArray(message: string | string[]) {
  if (typeof message === 'string') {
    return [message];
  }
  return message;
}
