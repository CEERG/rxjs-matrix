import {
  makeAutoObservable,
  reaction
} from "mobx";

import { GameStatus } from "types/gameStatus";
import GameStore from "stores/gameStore";
import { generateNextGrid } from "modules/generateNextGrid";
import GridStore from "stores/gridStore";

class GameEngineStore {
  public gameStore: GameStore;

  private interval: NodeJS.Timer | null = null;

  private readonly nextTurnDelay = 50;

  public constructor(gameStore: GameStore) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.gameStore = gameStore;

    reaction(
      () => this.gameStore.gameStatusStore.gameStatus,
      () => this.gameStore.gameStatusStore.gameStatus === GameStatus.Running && this.startGame()
    );

    reaction(
      () => this.gameStore.gameStatusStore.gameStatus,
      () => this.gameStore.gameStatusStore.gameStatus === GameStatus.Stopped && this.stopGame()
    );
  }

  private startGame(): void {
    this.interval = setInterval(() => {
      this.playNextTurn();
    }, this.nextTurnDelay);
  }

  private stopGame(): void {
    this.interval && clearInterval(this.interval);

    this.interval = null;
  }

  private playNextTurn(): void {
    this.gameStore.gridStore.addNewGrid(
      new GridStore(
        generateNextGrid(
          this.gameStore.currentState
        ),
        this.gameStore.gameSettingsStore.width,
        this.gameStore.gameSettingsStore.height,
      )
    );
  }
}

export default GameEngineStore;