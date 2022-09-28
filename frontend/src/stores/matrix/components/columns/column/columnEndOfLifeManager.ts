import { EndOfLifeManagerInterface } from "interfaces/endOfLife";
import { Observable, Subject, takeUntil } from "rxjs";
import Column from "./column";

class ColumnEndOfLifeManager implements EndOfLifeManagerInterface {
  public endOfLife = new Subject<void>();

  public constructor(cols: Observable<number>, column: Column) {
    this.endWhenColsDecreased(cols, column);
  }

  private endWhenColsDecreased(cols: Observable<number>, column: Column): void {
    cols.pipe(
      takeUntil(this.endOfLife)
    ).subscribe((col) => {
      if (column.col > col) {
        this.endOfLife.next();
        this.endOfLife.complete();
      }
    });
  }
}

export default ColumnEndOfLifeManager;