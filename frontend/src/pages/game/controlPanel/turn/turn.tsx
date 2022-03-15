import React from "react";
import { observer } from "mobx-react";
import { Typography } from "@material-ui/core";

import { useGameStore } from "app";

import styles from "./turn.less";

export default observer((): React.ReactElement => {
  return <Typography className={styles.turn} variant="subtitle1">Ход: {useGameStore().turn}</Typography>;
});