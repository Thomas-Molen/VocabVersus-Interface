import { createContext } from 'react';
import { IGameHubCommands } from './types/GameHubTypes';

export const GameHubContext = createContext<IGameHubCommands>({
    JoinGame: ((username: string) => console.log(`Joined as: ${username}`)),
});