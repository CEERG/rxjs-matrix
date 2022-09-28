import { BehaviorSubject } from 'rxjs';
import TickManager from "./components/tickManager";
import ColumnsManager from "./components/columns/columnsManager";

class Matrix {
  public cols;

  public rows;

  public tickManager;

  public columnsManager;

  public constructor(initialCols: number, initialRows: number, initialTickRate: number) {
    this.cols = new BehaviorSubject(initialCols);

    this.rows = new BehaviorSubject(initialRows);

    this.tickManager = new TickManager(initialTickRate);

    this.columnsManager = new ColumnsManager(this.cols, this.rows, this.tickManager);
  }
}

export default Matrix;