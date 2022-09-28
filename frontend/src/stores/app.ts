import { BehaviorSubject } from 'rxjs';
import TickRateMeasurer from './matrix/components/tickRateMeasurer';
import Matrix from './matrix/matrix';

class App {
  public matrix;

  public tickRateMeasurer;

  public fontSize;

  public constructor(initialCols: number, initialRows: number, initialTickRate: number, initialFontSize: number) {
    this.matrix = new Matrix(initialCols, initialRows, initialTickRate);

    this.tickRateMeasurer = new TickRateMeasurer(this.matrix.tickManager);

    this.fontSize = new BehaviorSubject(initialFontSize);
  }
}

export default App;