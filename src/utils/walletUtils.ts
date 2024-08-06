import CryptoJS from "crypto-js";

export function truncateAddress(
  address: string,
  startLength = 7,
  endLength = 5
) {
  const truncatedStart = address.slice(0, startLength);
  const truncatedEnd = address.slice(-endLength);

  return truncatedStart + "..." + truncatedEnd;
}

export function gen_key(key: string) {
  const hash = CryptoJS.SHA256(key).toString(CryptoJS.enc.Hex);
  const generatedKey = hash.substring(0, 10);

  return generatedKey;
}

export function compareAddress(addr1: string, addr2: string) {
  return addr1.toLowerCase() === addr2.toLowerCase();
}
