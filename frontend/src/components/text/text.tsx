import React, { FunctionComponent } from "react";
import Button from "@mui/material/Button";
import useObservable from "utils/useObservable";
import { Observable } from "rxjs";

const Text: FunctionComponent<{
  value: Observable<number>
}> = ({
  value: valueObservable
}) => {
  const value = useObservable(valueObservable);

  if (value === undefined) return null;

  return <Button variant="outlined">{value}</Button>;
};

export default Text;