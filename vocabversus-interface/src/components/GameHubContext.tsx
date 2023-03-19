import { createContext } from 'react';
import { IGameHubCommands } from './types/GameHubTypes';

export const GameHubContext = createContext<IGameHubCommands>({
    SendMessage: ((message: string) => console.log(message)),
});