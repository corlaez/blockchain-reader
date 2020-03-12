export const state = {
  latest: null,
  blockHash: "",
  blocks: [],
  txHash: null,
  transaction: null,
  get firstBlock() {
    const blocks = this.blocks;
    if (blocks.length > 0) return this.blocks[0]
    return null
  },
  get showPreviousButton() {
    const blocks = this.blocks;
    if (blocks.length > 0) {
      const prevBlock = blocks[blocks.length - 1].prev_block;
      return prevBlock !== this.rootPreviousHash
    }
    return null
  },
  isNotRoot: block => (state) => block.prev_block !== state.rootPreviousHash,
  rootPreviousHash: "0000000000000000000000000000000000000000000000000000000000000000"
};
