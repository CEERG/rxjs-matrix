import { EndOfLifeInterface } from "interfaces/endOfLife";
import { concat, Observable, of, Subject, take, switchMap } from "rxjs";
import randomLetter from "utils/randomLetter";
import AliveEntitiesManager from "../../aliveEntitiesManager";
import Column from "../../columns/column/column";
import Raindrop from "../../raindrops/raindrop/raindrop";
import SymbolEndOfLifeManager from "./symbolEndOfLifeManager";

class Symbol implements EndOfLifeInterface {
  public row;

  public endOfLifeManager;

  public letter = new Subject<string>();

  public glowing = new Subject<boolean>();

  public constructor(rows: Observable<number>, column: Column, row: number, raindropsAliveManager: AliveEntitiesManager<Raindrop>) {
    this.row = row;

    this.endOfLifeManager = new SymbolEndOfLifeManager(rows, column, this);

    const aliveRaindropsOnCreation = raindropsAliveManager.alive.pipe(take(1), switchMap((aliveRaindrops) => of(...aliveRaindrops)));

    concat(aliveRaindropsOnCreation, column.raindropsManager.generator.raindrops).subscribe((raindrop) => {
      raindrop.position.subscribe((position) => {
        // generates a new letter whenever raindrop's position row matches symbol's row
        if (position === this.row) {
          this.letter.next(randomLetter());

          this.glowing.next(true);

          raindrop.position.pipe(take(1)).subscribe(() => this.glowing.next(false));
        }

        //cleans when raindrop leaves symbol row
        if (position - raindrop.length === this.row) {
          this.letter.next("");
        }
      });
    });
  }
}

export default Symbol;