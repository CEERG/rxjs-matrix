import App from "page/app";
import React from "react";
import AppStore from "stores/app";

export default function(): React.ReactElement {
  return <App app={ app } />;
}

const app = new AppStore(85, 40, 50, 17);