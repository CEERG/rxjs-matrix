import { Observable, Subject } from "rxjs";
import Column from "./column/column";
import TickManager from "../tickManager";

class ColumnsGenerator {
  public columns = new Subject<Column>();

  public constructor(cols: Observable<number>, rows: Observable<number>, tickManager: TickManager) {
    let lastCreatedCol = 0;

    // setTimeout to let others to subscribe before emitting and avoid using ReplaySubject
    setTimeout(() => {
      cols.subscribe((latestCol) => {
        if (latestCol === 0) {
          lastCreatedCol = latestCol;

          return;
        }

        if (lastCreatedCol > latestCol) {
          lastCreatedCol = latestCol;

          return;
        }

        while (lastCreatedCol < latestCol) {
          this.columns.next(new Column(cols, rows, tickManager, ++lastCreatedCol));
        }
      });
    });
  }
}

export default ColumnsGenerator;