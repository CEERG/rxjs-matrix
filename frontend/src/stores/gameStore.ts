import { makeAutoObservable } from "mobx";

import GridHistoryStore from "stores/gridHistoryStore";
import GameStatusStore from "stores/gameStatusStore";
import GameEngineStore from "stores/gameEngineStore";
import GameSettingsStore from "stores/gameSettingsStore";
import { generateRandomGrid } from "modules/generateRandomGrid";
import GridStore from "stores/gridStore";

class GameStore {
  private interval: NodeJS.Timer | null = null;

  public gridStore!: GridHistoryStore;

  public gameStatusStore: GameStatusStore;
  public gameEngineStore: GameEngineStore;
  public gameSettingsStore: GameSettingsStore;

  public constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    this.gameStatusStore = new GameStatusStore();
    this.gameEngineStore = new GameEngineStore(this);
    this.gameSettingsStore = new GameSettingsStore();

    this.setNewGame();
  }

  public setNewGame(): void {
    this.gridStore = new GridHistoryStore(
      new GridStore(
        generateRandomGrid(
          this.gameSettingsStore.width,
          this.gameSettingsStore.height,
          this.gameSettingsStore.dencity
        ),
        this.gameSettingsStore.width,
        this.gameSettingsStore.height,
      )
    );
  }

  public get currentState(): GridStore {
    return this.gridStore.grid[this.gridStore.grid.length - 1];
  }

  public get turn(): number {
    return this.gridStore.grid.length - 1;
  }
}

export default GameStore;
