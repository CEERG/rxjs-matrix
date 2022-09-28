import React, { FunctionComponent } from "react";
import useObservable from "utils/useObservable";
import { Observable } from "rxjs";
import classNames from "classnames";
import SymbolStore from "stores/matrix/components/symbols/symbol/symbol";
import px from "utils/px";

import styles from "./symbol.less";

const Symbol: FunctionComponent<{
  symbol: SymbolStore,
  fontSize: Observable<number>
}> = ({
  symbol,
  fontSize: fontSizeObservable
}) => {
  const letter = useObservable(symbol.letter);

  const glowing = useObservable(symbol.glowing);

  const fontSize = useObservable(fontSizeObservable);

  if (fontSize === undefined) return null;

  const style = { "fontSize": px(fontSize), "width": px(fontSize * 1.25), "height": px(fontSize * 1.25) };

  return <div style={ style } className={ classNames(styles.symbol, { [styles.glowing]: glowing }) }>
    { letter }
  </div>;
};

export default Symbol;