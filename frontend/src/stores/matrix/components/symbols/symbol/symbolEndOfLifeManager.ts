import { EndOfLifeManagerInterface } from "interfaces/endOfLife";
import { Observable, Subject, takeUntil } from "rxjs";
import Column from "../../columns/column/column";
import Symbol from "./symbol";

class SymbolEndOfLifeManager implements EndOfLifeManagerInterface {
  public endOfLife = new Subject<void>();

  public constructor(rows: Observable<number>, column: Column, symbol: Symbol) {
    this.endWhenColumnLifeEnds(column);
    this.endWhenRowsDecreased(rows, symbol);
  }

  private endWhenColumnLifeEnds(column: Column): void {
    column.endOfLifeManager.endOfLife.pipe(
      takeUntil(this.endOfLife)
    ).subscribe(() => {
      this.endOfLife.next();
      this.endOfLife.complete();
    });
  }

  private endWhenRowsDecreased(rows: Observable<number>, symbol: Symbol): void {
    rows.pipe(
      takeUntil(this.endOfLife)
    ).subscribe((row) => {
      if (symbol.row > row) {
        this.endOfLife.next();
        this.endOfLife.complete();
      }
    });
  }
}

export default SymbolEndOfLifeManager;