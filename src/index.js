import React from "react";
import ReactDOM from "react-dom";
import { BlockExplorer } from "./BlockExplorer";
import "./styles.scss";
import { Provider } from "overmind-react";
import { app } from "./app/config";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <Provider value={app}>
      <BlockExplorer />
    </Provider>
  </React.StrictMode>,
  rootElement
);
