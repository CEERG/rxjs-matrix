import React from "react";
import { observer } from "mobx-react";
import { Button } from "@material-ui/core";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowArrowIcon from "@material-ui/icons/PlayArrow";

import { useGameStore } from "app";
import { GameStatus } from "types/gameStatus";

import styles from "./controlButtons.less";

export default observer((): React.ReactElement => {
  const buttonProps = {
    variant: "outlined" as const,
    disabled: false,
    className: styles.panelButton,
    size: "large" as const,
    margin: "normal" as const,
    color: "primary" as const
  };

  return <div>
    { (useGameStore().gameStatusStore.gameStatus === GameStatus.ReadyToStart ||
      useGameStore().gameStatusStore.gameStatus === GameStatus.Stopped) &&
      <Button {...buttonProps} onClick={() => useGameStore().gameStatusStore.setGameStatus(GameStatus.Running)}>
        <PlayArrowArrowIcon />
      </Button>
    }

    { useGameStore().gameStatusStore.gameStatus === GameStatus.Running &&
      <Button {...buttonProps} onClick={() => useGameStore().gameStatusStore.setGameStatus(GameStatus.Stopped)}>
        <PauseIcon />
      </Button>
    }
  </div>;
});