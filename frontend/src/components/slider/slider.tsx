import React, { FunctionComponent } from "react";
import MuiSlider from "@mui/material/Slider";
import MuiTypography from "@mui/material/Typography";
import MuiStack from "@mui/material/Stack";
import useObservable from "hooks/useObservable";
import { Observable } from "rxjs";

const Slider: FunctionComponent<{
  value: Observable<number>,
  onChange: (newValue: number) => void,
  label: string,
  min: number,
  max: number,
  step: number
}> = ({
  value: valueObservable,
  onChange,
  label,
  min,
  max,
  step
}) => {
  const value = useObservable(valueObservable);

  if (value === undefined) return null;

  return <MuiStack direction="column">
    <MuiTypography gutterBottom>
      { label }: { value }
    </MuiTypography>
    <MuiSlider
      value={ value }
      onChange={ (e, newValue) => !Array.isArray(newValue) && onChange(newValue) }
      getAriaValueText={ String }
      valueLabelDisplay="off"
      step={ step }
      marks
      min={ min }
      max={ max }
      style={ { "width": "200px" } }
    />
  </MuiStack>;
};

export default Slider;