import { Sell } from "types/sell";

class GridStore {
  public width: number;
  public height: number;

  public readonly grid: Array<Array<Sell>> = [];
  public readonly gridRaw: Sell[] = [];

  public constructor(gridRaw: Sell[], width: number, height: number) {
    this.gridRaw = gridRaw;

    this.width = width;
    this.height = height;

    this.setGrid(gridRaw);

  }

  private setGrid(gridRaw: Sell[]): void {
    let x = 0;

    let  stash: Sell[] = [];

    gridRaw.forEach((sell) => {
      if (x !== sell.position.x) {
        this.grid.push(stash);

        x = sell.position.x;
        stash = [];
      }

      stash.push(sell);
    });

    this.grid.push(stash);
  }
}

export default GridStore;