import { createContext } from 'react';

export interface ICountDownContext {
    SetCountDown(count: number, highlight?: boolean): void,
  }

export const CountDownContext = createContext<ICountDownContext>({
    SetCountDown: ((count: number, highlight: boolean = true) => console.log("SetCountDown not set for CountDownContext")),
});