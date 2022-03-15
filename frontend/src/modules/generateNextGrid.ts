import { Sell } from "types/sell";
import { SellState } from "types/sellState";
import GridStore from "stores/gridStore";

export function generateNextGrid(gridStore: GridStore): Sell[] {
  const nextGrid: Sell[] = [];

  for (let width = 0; width < gridStore.width; width++) {
    for (let height = 0; height < gridStore.height; height++) {
      const sell = gridStore.grid[width][height];

      const adjacentSells = getAdjacentSells(gridStore, sell);

      const aliveAdjacentSells = adjacentSells.filter((adjacentSell) => adjacentSell.state === "alive");
  
      let state!: SellState;
  
      if (sell.state === "alive") {
        if (aliveAdjacentSells.length < 2 || aliveAdjacentSells.length > 3) {
          state =  "dead";
        } else {
          state = "alive";
        }
      }
  
      if (sell.state === "dead") {
        if (aliveAdjacentSells.length === 3) {
          state = "alive";
        } else {
          state =  "dead";
        }
      }

      nextGrid.push({
        state,
        position: {
          x: sell.position.x,
          y: sell.position.y
        }
      });


    }
  }

  return nextGrid;
}

function getAdjacentSells(gridStore: GridStore, sell: Sell): Sell[] {
  const adjacentPositionsOffsets: Array<[width: number, height: number]> = [
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1]
  ];

  const adjacentPositions: Array<[x: number, y: number]> = adjacentPositionsOffsets.map((adjacentPositionOffset) => {
    return [sell.position.x + adjacentPositionOffset[0], sell.position.y + adjacentPositionOffset[1]];
  });

  const adjacentSells: Sell[] = [];
  
  adjacentPositions.forEach((adjacentPosition) => {
    const width = adjacentPosition[0];
    const height = adjacentPosition[1];

    if (width >= 0 && width < gridStore.width && height >= 0 && height < gridStore.height) {
      const adjacentSell = gridStore.grid[adjacentPosition[0]][adjacentPosition[1]];

      adjacentSells.push(adjacentSell);
    }
  });

  return adjacentSells;
}