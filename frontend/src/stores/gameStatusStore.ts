import { makeAutoObservable } from "mobx";

import { GameStatus } from "types/gameStatus";

class GameStatusStore {
  public gameStatus: GameStatus = GameStatus.ReadyToStart;

  public constructor() {
    makeAutoObservable(this);
  }

  public setGameStatus(gameStatus: GameStatus): void {
    this.gameStatus = gameStatus;
  }
}

export default GameStatusStore;