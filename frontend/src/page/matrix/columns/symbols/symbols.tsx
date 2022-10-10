import React, { Fragment, FunctionComponent } from "react";
import useObservable from "hooks/useObservable";
import { Observable } from "rxjs";
import SymbolsManager from "stores/matrix/components/symbols/symbolsManager";
import Symbol from "components/symbol/symbol";

const Symbols: FunctionComponent<{
  symbolsManager: SymbolsManager,
  fontSize: Observable<number>
}> = ({
  symbolsManager,
  fontSize
}) => {
  const symbols = useObservable(symbolsManager.aliveManager.alive);

  return <Fragment>
    {
      symbols?.map((symbol) => <Symbol key={ symbol.row } symbol={ symbol } fontSize={ fontSize }/>)
    }
  </Fragment>;
};

export default Symbols;