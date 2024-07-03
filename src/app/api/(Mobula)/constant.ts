export function getConstants() {
  const Mobula_Key = process.env.MOBULA_API_KEY as string;
  const Mobula_Api = "https://api.mobula.io/api/1/wallet";

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "assetscooperd25f5eb7-6073-4945-b8f1-740f8b8934ac");
  const options = {
    method: "GET",
    headers: headers,
  };
  const blockchainsParam = 8453;
  return { Mobula_Api, options, blockchainsParam };
}
