import { Observable } from "rxjs";
import Column from "../columns/column/column";
import TickManager from "../tickManager";
import RaindropsGenerator from "./raindropsGenerator";
import AliveEntitiesManager from "../aliveEntitiesManager";

class RaindropsManager {
  public generator;

  public aliveManager;

  public constructor(rows: Observable<number>, tickManager: TickManager, column: Column) {
    this.generator = new RaindropsGenerator(rows, tickManager, column);

    this.aliveManager = new AliveEntitiesManager(this.generator.raindrops);
  }
}

export default RaindropsManager;