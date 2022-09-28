import { EndOfLifeInterface } from "interfaces/endOfLife";
import { Observable, BehaviorSubject } from "rxjs";

class AliveEntitiesManager<T extends EndOfLifeInterface> {
  public alive = new BehaviorSubject<T[]>([]);

  public constructor(entityGeneratorStream: Observable<T>) {
    let aliveCache: T[] = [];

    entityGeneratorStream.subscribe((entity) => {
      // add to array whenever new entity gets generated
      aliveCache.push(entity);

      this.alive.next([...aliveCache]);

      // remove from array whenever entity dies
      entity.endOfLifeManager.endOfLife.subscribe(() => {
        aliveCache = aliveCache.filter((columnCache) => columnCache !== entity);

        this.alive.next(aliveCache);
      });
    });
  }
}

export default AliveEntitiesManager;