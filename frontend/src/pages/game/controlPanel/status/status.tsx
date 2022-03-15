import React from "react";
import { observer } from "mobx-react";
import { Typography } from "@material-ui/core";

import { useGameStore } from "app";
import { getGameStatusName } from "modules/getGameStatusName";

import styles from "./status.less";

export default observer((): React.ReactElement => {
  return <Typography className={styles.status} variant="subtitle1">
    Статус: { getGameStatusName(useGameStore().gameStatusStore.gameStatus) }
  </Typography>;
});