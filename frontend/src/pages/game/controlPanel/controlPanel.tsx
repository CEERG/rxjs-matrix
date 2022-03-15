import React from "react";
import { observer } from "mobx-react";

import ControlButtons from "./controlButtons/controlButtons";
import Turn from "./turn/turn";
import Status from "./status/status";

import styles from "./controlPanel.less";

export default observer((): React.ReactElement => {
  return <div className={styles.controlPanel}>
    <div className={styles.element}><Turn /></div>
    <div className={styles.element}><ControlButtons /></div>
    <div className={styles.element}><Status /></div>
  </div>;
});