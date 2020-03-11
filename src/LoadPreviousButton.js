import React from "react";
import { useApp } from "./app/config";

// The prev_hash of the first block
const rootPreviousHash =
  "0000000000000000000000000000000000000000000000000000000000000000";

export const LoadPreviousButton = () => {
  const app = useApp();

  const loading = app.state.loading;
  const loadPreviousClass =
    "container " + (loading ? "disabled-button" : "button");

  const blocks = app.state.blocks;
  const prevBlock = blocks[blocks.length - 1].prev_block;

  const { loadPrevious } = app.actions;
  const validPrevBlock = prevBlock !== rootPreviousHash;

  return validPrevBlock ? (
    <div onClick={loadPrevious} className={loadPreviousClass}>
      <h4 style={{ paddingTop: 10, paddingBottom: 10 }}>
        {"Load Previous Block"}
      </h4>
    </div>
  ) : (
    "End of the chain"
  );
};
