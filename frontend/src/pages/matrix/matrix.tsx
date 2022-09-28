import React, { FunctionComponent } from "react";
import { Subject } from "rxjs";
import ColumnsManager from "stores/matrix/components/columns/columnsManager";
import Columns from "./columns/columns";
import useObservable from "utils/useObservable";

import styles from "./matrix.less";

const Matrix: FunctionComponent<{
  columnsManager: ColumnsManager,
  fontSize: Subject<number>
}> = ({
  columnsManager,
  fontSize: fontSizeObservable
}) => {
  const fontSize = useObservable(fontSizeObservable);

  if (fontSize === 0) return null;

  return <div className={ styles.matrix }>
    <Columns columnsManager={ columnsManager } fontSize={ fontSizeObservable }/>
  </div>;
};

export default Matrix;