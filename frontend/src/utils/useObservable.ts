import {
  useEffect,
  useState,
} from "react";
import { Observable } from "rxjs";

const useObservable = <T>(observable: Observable<T>): T | undefined => {
  const [state, setState] = useState<T>();

  useEffect(() => {
    const subscription = observable.subscribe(setState);

    return () => subscription.unsubscribe();
  }, []);

  return state;
};

export default useObservable;