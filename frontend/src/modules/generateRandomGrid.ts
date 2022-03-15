import { Sell } from "types/sell";
import { SellState } from "types/sellState";

export function generateRandomGrid(width: number, height: number, density: number): Sell[] {
  const grid: Sell[] = [];

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const state: SellState = Math.random() < density ? "alive" : "dead";

      grid.push({
        state,
        position: {
          x: i,
          y: j
        }
      });
    }
  }

  return grid;
}