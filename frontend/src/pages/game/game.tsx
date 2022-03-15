import React from "react";
import { observer } from "mobx-react";

import ControlPanel from './controlPanel/controlPanel';
import Playground from './playground/playground';

import styles from "./game.less";

export default observer((): React.ReactElement => {
  return <div className={styles.game}>
    <ControlPanel/>
    <div className={styles.playground}>
      <Playground />
    </div>
  </div>;
});