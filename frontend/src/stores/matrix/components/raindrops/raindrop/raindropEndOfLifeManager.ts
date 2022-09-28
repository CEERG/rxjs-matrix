import { combineLatestWith, Observable, Subject, takeUntil } from "rxjs";
import Column from "../../columns/column/column";
import Raindrop from "./raindrop";

class RaindropEndOfLifeManager {
  public endOfLife = new Subject<void>();

  public constructor(rows: Observable<number>, raindrop: Raindrop, column: Column) {
    this.endWhenColumnLifeEnds(column);
    this.endWhenOutOfRowsBoundaries(rows, raindrop);
  }

  private endWhenColumnLifeEnds(column: Column): void {
    column.endOfLifeManager.endOfLife.pipe(
      takeUntil(this.endOfLife)
    ).subscribe(() => {
      this.endOfLife.next();
      this.endOfLife.complete();
    });
  }

  private endWhenOutOfRowsBoundaries(rows: Observable<number>, raindrop: Raindrop): void {
    raindrop.position.pipe(
      combineLatestWith(rows)
    ).subscribe(([position, latestRow]) => {
      if (position - raindrop.length > latestRow) {
        this.endOfLife.next();
        this.endOfLife.complete();
      }
    });
  }
}

export default RaindropEndOfLifeManager;