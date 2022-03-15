import { SellState } from "types/sellState";

export type Sell = {
    state: SellState
    position: {
        x: number
        y: number
    }
}