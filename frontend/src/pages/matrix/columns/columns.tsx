import React, { Fragment, FunctionComponent } from "react";
import { Observable } from "rxjs";
import ColumnsManager from "stores/matrix/components/columns/columnsManager";
import useObservable from "hooks/useObservable";
import Symbols from "./symbols/symbols";

const Columns: FunctionComponent<{
  columnsManager: ColumnsManager,
  fontSize: Observable<number>
}> = ({
  columnsManager,
  fontSize
}) => {
  const columns = useObservable(columnsManager.aliveManager.alive);

  if (columns === undefined) {
    return null;
  }

  return <Fragment>
    {
      columns.map((column) => <div key={ column.col }>
        <Symbols symbolsManager={ column.symbolsManager } fontSize={ fontSize }/>
      </div>)
    }
  </Fragment>;
};

export default Columns;