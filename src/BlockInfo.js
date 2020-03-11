import React, { useState } from "react";
import JsonView from "react-json-view";

export const BlockInfo = ({ isLatest, block, setTxHash }) => {
  // next_block and weight are not documented, ignore.
  const { tx, ...blockJsonView } = block;
  // Function that displays the transaction detail
  const viewTransaction = ({ name, value }) => {
    if (name === "hash") setTxHash(value);
  };
  const jsonViewProps = {
    displayDataTypes: false,
    enableClipboard: false
  };
  const [index, setIndex] = useState("");
  const txLength = block.tx.length;
  const changeIndex = e => {
    const value = e.currentTarget.value;
    if (value === "") setIndex(value);
    else if (isNaN(value) || value < 0 || value >= txLength) return;
    else setIndex(+value);
  };
  return (
    <div className="container">
      <h4>
        Block {block.height} {isLatest(block) && "(latest)"}
      </h4>
      <JsonView {...jsonViewProps} collapsed name="data" src={blockJsonView} />
      <div>
        Additionally, there is a "tx" array with {txLength} transactions
      </div>
      Show transaction with index:{" "}
      <input value={index} onChange={changeIndex} size={5} />
      {index !== "" && (
        <JsonView
          {...jsonViewProps}
          name={"tx[" + index + "]"}
          src={tx[index]}
          onSelect={viewTransaction}
        />
      )}
    </div>
  );
};
