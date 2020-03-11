import { createHook } from "overmind-react";
import { state } from "./state";
import * as actions from "./actions";
import * as effects from "./effects";

const onInitialize = async ({ actions }) => {
  actions.updateLatest();
};

// for testing
export const config ={
  state,
  actions,
  effects,
  onInitialize
};

export const useApp = createHook();
