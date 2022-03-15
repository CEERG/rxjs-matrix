import { GameStatus } from "types/gameStatus";

export function getGameStatusName(gameStatus: GameStatus): string {
  switch (gameStatus) {
  case GameStatus.ReadyToStart:
    return "Новая игра";
  case GameStatus.Running:
    return "Идёт";
  case GameStatus.Stopped:
    return "Остановлена";
  case GameStatus.Finished:
    return "Закончена";
  }
}