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
      <h2>Block Explorer</h2>
      Enter a block hash (legnth: 64) to see it's information:
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
      <div style={{ display: "flex" }}>
        <span className={buttonClass} onClick={updateLatest}>
          {true ? "Update latest" : "Go to Latest"}
        </span>
      </div>
    </div>
  );
};
