import React from "react";
import { useApp } from "./app/config";

export const LoadPreviousButton = () => {
  const app = useApp();

  const loading = app.state.loading;
  const loadPreviousClass =
    "container " + (loading ? "disabled-button" : "button");

  const { loadPrevious } = app.actions;
  const { showPreviousButton } = app.state;

  return showPreviousButton ? (
    <div onClick={loadPrevious} className={loadPreviousClass}>
      <h4 style={{ paddingTop: 10, paddingBottom: 10 }}>
        {"Load Previous Block"}
      </h4>
    </div>
  ) : (
    "End of the chain"
  );
};
