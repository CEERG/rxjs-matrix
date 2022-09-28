import { Observable, Subject, switchMap, combineLatest, takeUntil } from "rxjs";
import randomNumber from "utils/randomNumber";
import Column from "../columns/column/column";
import Raindrop from "./raindrop/raindrop";
import TickManager from "../tickManager";

class RaindropsGenerator {
  public raindrops = new Subject<Raindrop>();

  private raindropLengthFactorMin = 0.1;
  private raindropLengthFactorMax = 0.5;

  private gapBetweenRaindropsFactorMin = 0.6;
  private gapBetweenRaindropsFactorMax = 1;

  public constructor(rows: Observable<number>, tickManager: TickManager, column: Column) {
    let skipTicks = randomNumber(0, 30);

    tickManager.ticks.pipe(
      takeUntil(column.endOfLifeManager.endOfLife),
      switchMap(() => combineLatest({ rows })),
    ).subscribe(({ rows: latestRows }) => {
      if (latestRows === 0) return;

      if (skipTicks === 0) {
        // create new raindrop
        const raindropLength = randomNumber(latestRows * this.raindropLengthFactorMin, latestRows * this.raindropLengthFactorMax);

        this.raindrops.next(new Raindrop(rows, tickManager, column, raindropLength));

        // set new value of skipTicks
        const gapBetweenRaindrops = randomNumber(latestRows * this.gapBetweenRaindropsFactorMin, latestRows * this.gapBetweenRaindropsFactorMax);

        skipTicks = raindropLength + gapBetweenRaindrops;
      }

      skipTicks--;
    });
  }
}

export default RaindropsGenerator;