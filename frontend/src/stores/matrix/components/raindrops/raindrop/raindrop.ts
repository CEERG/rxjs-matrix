import { Observable, Subject, takeUntil } from "rxjs";
import Column from "../../columns/column/column";
import TickManager from "../../tickManager";
import RaindropEndOfLifeManager from "./raindropEndOfLifeManager";

class Raindrop {
  public length;

  public endOfLifeManager;

  public position = new Subject<number>();

  public constructor(rows: Observable<number>, tickManager: TickManager, column: Column, length: number) {
    this.length = length;

    this.endOfLifeManager = new RaindropEndOfLifeManager(rows, this, column);

    this.setPosition(rows, tickManager);
  }

  private setPosition(rows: Observable<number>, tickManager: TickManager): void {
    let position = 0;

    tickManager.ticks.pipe(
      takeUntil(this.endOfLifeManager.endOfLife),
    ).subscribe(() => {
      this.position.next(++position);
    });

    this.endOfLifeManager.endOfLife.subscribe(() => {
      this.position.complete();
    });
  }
}

export default Raindrop;