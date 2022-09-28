import { Observable, Subject } from "rxjs";
import Column from "../columns/column/column";
import Symbol from "./symbol/symbol";

class SymbolsGenerator {
  public symbols = new Subject<Symbol>();

  public constructor(rows: Observable<number>, column: Column) {
    let lastCreatedRow = 0;

    // setTimeout to let others to subscribe before emitting and avoid using ReplaySubject
    setTimeout(() => {
      rows.subscribe((latestRow) => {
        if (latestRow === 0) {
          lastCreatedRow = latestRow;

          return;
        }

        if (lastCreatedRow > latestRow) {
          lastCreatedRow = latestRow;

          return;
        }

        while (lastCreatedRow < latestRow) {
          this.symbols.next(new Symbol(rows, column, ++lastCreatedRow, column.raindropsManager.aliveManager));
        }
      });
    });
  }
}

export default SymbolsGenerator;