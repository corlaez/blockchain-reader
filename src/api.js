import axios from "axios";

// Api section
const CancelToken = axios.CancelToken;

// A helper to create cancellable requests
const blockchain = resource => (callback, errorHandler) => {
  const source = CancelToken.source();
  blockchainSimple(resource, {
    cancelToken: source.token
  })()
    .then(callback)
    .catch(errorHandler);
  return source.cancel;
};

const blockchainSimple = (resource, options) => () => {
  const url = `https://blockchain.info/${resource}?cors=true&format=json`;
  console.log(url);
  return axios.get(url, options).then(x => x.data);
};

export const getLatestBlockPromise = async () => {
  const latest = await blockchainSimple("latestblock")();
  const latestBlock = await blockchainSimple("rawblock/" + latest.hash)();
  return latestBlock;
};
// Api public functions
export const getLatestBlock = (callback, errorHandler) => {
  const source = CancelToken.source();
  getLatestBlockPromise()
    .then(callback)
    .catch(errorHandler);
  return source.cancel;
};
export const getBlock = (hash, callback, errorHandler) =>
  blockchain("rawblock/" + hash)(callback, errorHandler);
export const getTransaction = (hash, callback, errorHandler) =>
  blockchain("rawtx/" + hash)(callback, errorHandler);
