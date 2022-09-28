import { Subject, interval, switchMap, BehaviorSubject } from 'rxjs';

class TickManager {
  public tickRate;

  public ticks = new Subject<number>();

  public constructor(initialTickRate: number) {
    this.tickRate = new BehaviorSubject(initialTickRate);

    this.tickRate.pipe(
      switchMap((tickRate) => interval(tickRate))
    ).subscribe(
      (tick) => this.ticks.next(tick)
    );
  }
}

export default TickManager;