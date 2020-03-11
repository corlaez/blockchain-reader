import axios from "axios";

// Api section
const blockchainSimple = (resource, options) => () => {
  const url = `https://blockchain.info/${resource}?cors=true&format=json`;
  return axios.get(url, options).then(x => x.data);
};

// Api public functions
export const getLatestBlock = async () => {
  const latest = await blockchainSimple("latestblock")();
  const latestBlock = await blockchainSimple("rawblock/" + latest.hash)();
  return latestBlock;
};
export const getBlock = hash => blockchainSimple("rawblock/" + hash)();
export const getTransaction = hash => blockchainSimple("rawtx/" + hash)();
