import React, { FunctionComponent } from "react";
import Stack from "@mui/material/Stack";
import Text from "components/text/text";
import Matrix from "stores/matrix/matrix";
import { Subject } from "rxjs";
import TickRateMeasurer from "stores/matrix/components/tickRateMeasurer";
import Slider from "components/slider/slider";

import styles from "./settings.less";

const Settings: FunctionComponent<{
  matrix: Matrix,
  fontSize: Subject<number>,
  tickRateMeasurer: TickRateMeasurer
}> = ({
  matrix,
  fontSize,
  tickRateMeasurer
}) => {
  const fontSizeSliderProps = {
    min: 0,
    max: 30,
    step: 1
  };

  const defaultSliderProps = {
    min: 0,
    max: 100,
    step: 5
  };

  return <div className={ styles.settings }>
    <Stack direction="row" spacing={10} alignItems="center">
      <Slider
        label="Font Size"
        value={ fontSize }
        onChange={ (value) => fontSize.next(value) }
        { ...fontSizeSliderProps }
      />
      <Slider
        label="Columns"
        value={ matrix.cols }
        onChange={ (value) => matrix.cols.next(value) }
        { ...defaultSliderProps }
      />
      <Slider
        label="Rows"
        value={ matrix.rows }
        onChange={ (value) => matrix.rows.next(value) }
        { ...defaultSliderProps }
      />
      <Slider
        label="Tick Rate"
        value={ matrix.tickManager.tickRate }
        onChange={ (value) => matrix.tickManager.tickRate.next(value) }
        { ...defaultSliderProps }
      />
      <Text
        value={ tickRateMeasurer.tickRate }
      />
    </Stack>
  </div>;
};

export default Settings;