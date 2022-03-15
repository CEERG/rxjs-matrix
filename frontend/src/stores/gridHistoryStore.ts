import { makeAutoObservable } from "mobx";

import GridStore from "stores/gridStore";

class GridHistoryStore {
  public readonly grid: GridStore[] = [];

  public constructor(grid: GridStore) {
    makeAutoObservable(this);

    this.addNewGrid(grid);
  }

  public addNewGrid(grid: GridStore): void {
    this.grid.push(grid);
  }
}

export default GridHistoryStore;