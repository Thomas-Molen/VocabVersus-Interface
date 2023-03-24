import { createContext } from "react";
import { IGameHubCommands } from "./GameHubCommands";

export const GameHubContext = createContext<IGameHubCommands>({
  JoinGame: (username: string) => {
    return new Promise<void>((resolve, reject) =>
      console.log(`Joined as: ${username}`)
    );
  },
});
