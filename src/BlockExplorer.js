import React from "react";
import { BlockInfo } from "./BlockInfo";
import { LoadPreviousButton } from "./LoadPreviousButton";
import { BlockExplorerHeader } from "./BlockExplorerHeader";
import { TxView } from "./TxView";
import { useApp } from "./app/config";

// Components
export const BlockExplorer = () => {
  const app = useApp();
  const {txHash, loading, blocks} = app.state;
  return txHash == null ? (
      <>
        <BlockExplorerHeader />
        {blocks.map(block => (
          <BlockInfo
            key={block.hash}
            block={block}
          />
        ))}
        <LoadPreviousButton />
        { loading && <div className="loader"/> }
      </>
  ) : (
    <TxView />
  );
};
