import { EndOfLifeInterface } from "interfaces/endOfLife";
import { Observable } from "rxjs";
import RaindropsManager from "../../raindrops/raindropsManager";
import SymbolsManager from "../../symbols/symbolsManager";
import TickManager from "../../tickManager";
import ColumnEndOfLifeManager from "./columnEndOfLifeManager";

class Column implements EndOfLifeInterface {
  public col;

  public endOfLifeManager;

  public raindropsManager;

  public symbolsManager;

  public constructor(cols: Observable<number>, rows: Observable<number>, tickManager: TickManager, col: number) {
    this.col = col;

    this.endOfLifeManager = new ColumnEndOfLifeManager(cols, this);

    this.raindropsManager = new RaindropsManager(rows, tickManager, this);

    this.symbolsManager = new SymbolsManager(rows, this);
  }
}

export default Column;