import React from "react";
import { useApp } from "./app/config";

export const BlockExplorerHeader = props => {
  const app = useApp();
  const { loading, blockHash } = app.state;
  const { searchTransaction, updateLatest, changeBlockHash } = app.actions;
  const buttonClass = loading ? "disabled-button" : "button";
  return (
    <div>
      <span className="button" onClick={searchTransaction}>
        Search Transaction
      </span>
      <br />
      <br />
      <h2>Blockchain Explorer</h2>
      Display blocks information and allows to get the previous block on the chain.<br/>
      Enter a block's hash (length: 64) to jump to that part of the block chain:
      <br />
      <textarea
        rows="2"
        cols="40"
        disabled={loading}
        onChange={changeBlockHash}
        value={blockHash}
        size="64"
        placeholder="Hash Search"
      />
      <div style={{marginTop: 5}}>
        <span className={buttonClass} onClick={updateLatest}>
          Jump to Latest
        </span>
      </div>
    </div>
  );
};
