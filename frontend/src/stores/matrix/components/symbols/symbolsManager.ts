import { Observable } from "rxjs";
import Column from "../columns/column/column";
import AliveEntitiesManager from "../aliveEntitiesManager";
import SymbolsGenerator from "./symbolsGenerator";

class SymbolsManager {
  public generator;

  public aliveManager;

  public constructor(rows: Observable<number>, column: Column) {
    this.generator = new SymbolsGenerator(rows, column);

    this.aliveManager = new AliveEntitiesManager(this.generator.symbols);
  }
}

export default SymbolsManager;