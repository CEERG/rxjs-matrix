import { Subject, pairwise, skip, bufferCount } from "rxjs";
import TickManager from "./tickManager";

class TickRateMeasurer {
  private tickTimings = new Subject<number>();

  private timingsDiffs = new Subject<number>();

  public tickRate = new Subject<number>();
 
  public constructor(tickManager: TickManager) {
    tickManager.ticks.subscribe(() => {
      this.tickTimings.next(Date.now());
    });

    this.tickTimings.pipe(
      pairwise(),
      skip(1)
    ).subscribe(([first, second]) => {
      this.timingsDiffs.next(second - first);
    });

    this.timingsDiffs.pipe(
      bufferCount(10, 10)
    ).subscribe((diffs) => {
      const summ = diffs.reduce((summ, diff) => summ + diff, 0);
    
      this.tickRate.next(summ / diffs.length);
    });
  }
}

export default TickRateMeasurer;