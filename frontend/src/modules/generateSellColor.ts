import { SellState } from "types/sellState";

export function generateSellColorFromSellState(sellState: SellState): string {
  switch (sellState) {
  case "dead":
    return "black";
  case "alive":
    return "green";
  }
}