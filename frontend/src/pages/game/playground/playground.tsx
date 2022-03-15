import React, {
  useRef, useState, useLayoutEffect
} from "react";
import { observer } from "mobx-react";
import {
  Stage, Layer, Rect
} from 'react-konva';
import { debounce } from "lodash";

import { useGameStore } from "app";
import { generateSellColorFromSellState } from "modules/generateSellColor";
import { calculateSellState } from "modules/calculateSellState";

import styles from "./playground.less";

export default observer((): React.ReactElement => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    width:0,
    height: 0
  });

  const updateDimensions = () => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight
      });
    }
  };

  useLayoutEffect(() => {
    if (targetRef.current) {
      const resizeObserver = new ResizeObserver(debounce(updateDimensions, 150));

      resizeObserver.observe(targetRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  const sellSize = calculateSellState(
    dimensions.width,
    dimensions.height,
    useGameStore().currentState.width,
    useGameStore().currentState.height
  );

  return <div className={styles.playground} ref={targetRef}>
    <Stage width={dimensions.width} height={dimensions.height}>
      <Layer listening={false}>
        {
          useGameStore().currentState.gridRaw.map((sell, i) => 
            <Rect
              listening={false}
              key={i}
              x={sellSize.xOffset + sell.position.x * sellSize.sellSize}
              y={sellSize.yOffset + sell.position.y * sellSize.sellSize}
              width={sellSize.sellSize}
              height={sellSize.sellSize}
              fill={generateSellColorFromSellState(sell.state)}
              dragDistance={1}
              scaleX={1}
            />
          )
        }
      </Layer>
    </Stage>
  </div>;
});