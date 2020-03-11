export const updateLatest = async ({ state, effects }) => {
  if (state.loading) return;
  state.loading = true;
  try {
    const latest = await effects.getLatestBlock();
    state.latest = latest;
    state.blockHash = latest.hash;
    state.blocks = [latest];
  } catch (e) {
  } finally {
    state.loading = false;
  }
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

export const loadPrevious = async ({ state, effects }) => {
  const blocks = state.blocks;
  if (state.loading || blocks.length === 0) return;
  state.loading = true;
  const prevBlock = blocks[blocks.length - 1].prev_block;
  try {
    const block = await effects.getBlock(prevBlock);
    state.blocks.push(block);
  } catch (e) {
  } finally {
    state.loading = false;
  }
};

export const loadTransaction = async ({ state, effects }) => {
  if (state.loading) return;
  state.loading = true;
  try {
    const tx = await effects.getTransaction(state.txHash);
    state.transaction = tx;
  } catch (e) {
    if (state.transaction)
      state.txHash = state.transaction.hash;
    else
      state.txHash = ""
  } finally {
    state.loading = false;
  }
};

export const changeBlockHash = async ({ state, effects }, e) => {
  if (state.loading) return;
  const blockHash = e.currentTarget.value;
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
      state.blockHash = firstBlock.hash;
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
