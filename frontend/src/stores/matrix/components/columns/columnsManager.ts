import { Observable } from "rxjs";
import TickManager from "../tickManager";
import ColumnsGenerator from "./columnsGenerator";
import AliveEntitiesManager from "../aliveEntitiesManager";

class ColumnsManager {
  public generator;

  public aliveManager;

  public constructor(cols: Observable<number>, rows: Observable<number>, tickManager: TickManager) {
    this.generator = new ColumnsGenerator(cols, rows, tickManager);

    this.aliveManager = new AliveEntitiesManager(this.generator.columns);
  }
}

export default ColumnsManager;