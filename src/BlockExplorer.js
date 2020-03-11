import React from "react";
import { BlockInfo } from "./BlockInfo";
import { LoadPreviousButton } from "./LoadPreviousButton";
import { BlockExplorerHeader } from "./BlockExplorerHeader";
import { TxView } from "./TxView";
import { useApp } from "./app/config";

// Components
export const BlockExplorer = () => {
  const app = useApp();
  const txHash = app.state.txHash;
  const blocks = app.state.blocks;
  const latest = app.state.latest;

  const setTxHash = app.actions.setTxHash;

  const isLatest = block =>
    latest && latest.height === block.height && latest.hash === block.hash;

  return txHash == null ? (
    blocks.length > 0 ? (
      <>
        <BlockExplorerHeader />
        {blocks.map(block => (
          <BlockInfo
            key={block.hash}
            block={block}
            isLatest={isLatest}
            setTxHash={setTxHash}
          />
        ))}
        <LoadPreviousButton />
      </>
    ) : (
      <h2>Loading</h2>
    )
  ) : (
    <TxView />
  );
};
