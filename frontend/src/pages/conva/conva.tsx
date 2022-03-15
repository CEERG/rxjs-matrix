import React from "react";
import { observer } from "mobx-react";
import {
  Stage, Layer, Rect
} from 'react-konva';

import { useGameStore } from "app";
import { generateSellColorFromSellState } from "modules/generateSellColor";

import styles from "./conva.less";

export default observer((): React.ReactElement => {
  return <Stage className={styles.conva} width={1500} height={900}>
    <Layer>
      {
        useGameStore().currentState.gridRaw.map((sell, i) => 
          <Rect
            key={i}
            x={sell.position.x * 200}
            y={sell.position.y * 200}
            width={100}
            height={100}
            fill={generateSellColorFromSellState(sell.state)}
            draggable={true}
            dragDistance={1}
            onClick={() => console.warn(123)}
          />
        )
      }
    </Layer>
  </Stage>;
});
