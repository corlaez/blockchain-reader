import React, { useEffect } from "react";
import JsonView from "react-json-view";
import { useApp } from "./app/config";

// Components
export const TxView = props => {
  const app = useApp();
  const { txHash, loading, transaction } = app.state;
  const { loadTransaction, setTxHash, syncTxHash, blockExplorer } = app.actions;
  const transactionHash = transaction && transaction.hash;
  // Recover the txHash value from transaction if it makes sense
  useEffect(syncTxHash, []);
  // Load transaction based on txHash
  useEffect(() => {
    if (txHash.length >= 64 && txHash !== transactionHash) {
      loadTransaction();
    }
  }, [txHash, transactionHash, loadTransaction]);
  return (
    <>
      <span className="button" onClick={blockExplorer}>
        Block Explorer
      </span>
      <br />
      <br />
      <h2>Search Transaction</h2>
      Enter the transaction's hash (length: 64) to see it's information:
      <br />
      <textarea
        rows="2"
        cols="40"
        disabled={loading}
        onChange={e => setTxHash(e.currentTarget.value)}
        value={txHash}
        size="64"
        placeholder="Hash Search"
      />
      {transaction != null && <TxInfo tx={transaction} />}
    </>
  );
};

const TxInfo = ({ tx }) => {
  return (
    <div className="container">
      <h4>Transaction</h4>
      <JsonView
        name="data"
        src={tx}
        displayDataTypes={false}
        enableClipboard={false}
      />
    </div>
  );
};
