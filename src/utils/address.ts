export function truncate(str: string, start = 4, stop = 6) {
  return str.slice(0, start) + "..." + str.slice(-stop);
}
