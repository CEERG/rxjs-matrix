import { makeAutoObservable } from "mobx";

class GameSettingsStore {
  public width = 80;
  public height = 40;
  public dencity = 0.2;

  public constructor() {
    makeAutoObservable(this);
  }
}

export default GameSettingsStore;