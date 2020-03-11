export const setLoading = ({ state }, payload) => {
  state.loading = payload;
};

export const updateLatest = async ({ state, effects }) => {
  if (state.loading) return;
  state.loading = true;
  const latest = await effects.getLatestBlock();
  state.latest = latest;
  state.blockHash = latest.hash;
  state.blocks = [latest];
  state.loading = false;
};

export const searchTransaction = ({ state }) => {
  state.txHash = "";
};

export const blockExplorer = ({ state }) => {
  state.txHash = null;
};

export const setTxHash = ({ state }, value) => {
  state.txHash = value;
};

export const setBlocks = ({ state }, value) => {
  state.blocks = value;
};

export const appendBlock = ({ state }, value) => {
  state.blocks.push(value);
};

export const loadPrevious = async ({ state, effects }) => {
  if (state.loading) return;
  state.loading = true;
  const blocks = state.blocks;
  const prevBlock = blocks[blocks.length - 1].prev_block;
  const block = await effects.getBlock(prevBlock);
  state.loading = false;
  state.blocks.push(block);
};

export const loadTransaction = async ({ state, effects }) => {
  if (state.loading) return;
  state.loading = true;
  try {
    const tx = await effects.getTransaction(state.txHash);
    state.transaction = tx;
  } catch (e) {
    state.txHash = state.transaction.hash;
  } finally {
    state.loading = false;
  }
};

export const changeBlockHash = async ({ state, effects }, e) => {
  if (state.loading) return;
  const blockHash = e.currentTarget.value;
  const oldBlockHash = state.blockHash;
  state.blockHash = blockHash;
  const firstBlock = state.blocks[0];
  if (blockHash !== firstBlock.hash && blockHash.length >= 64) {
    state.loading = true;
    try {
      const block = await effects.getBlock(blockHash);
      state.blocks = [block];
      state.loading = false;
    } catch (e) {
    } finally {
      state.blockHash = oldBlockHash;
      state.loading = false;
    }
  }
};

export const syncTxHash = ({ state }) => {
  if (state.txHash === "") {
    const transactionHash = state.transaction && state.transaction.hash;
    if (transactionHash) {
      state.txHash = transactionHash;
    }
  }
};
