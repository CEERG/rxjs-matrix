import { Subject } from "rxjs";

export interface EndOfLifeManagerInterface {
  endOfLife: Subject<void>;
}

export interface EndOfLifeInterface {
  endOfLifeManager: EndOfLifeManagerInterface;
}