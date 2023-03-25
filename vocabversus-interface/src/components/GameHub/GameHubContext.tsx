import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { createContext } from "react";
import {
  GameHubEventHandler,
  PlayerJoined,
} from "../../utility/GameHubEventsHandler";
import { IGameHubCommands } from "./IGameHubCommands";

export const GameHubCommandsContext = createContext<IGameHubCommands>({
  JoinGame: (username: string) => {
    return new Promise<void>((resolve, reject) =>
      console.log("JoinGame has not been set for GameHubCommandsContext")
    );
  },
});

export const GameHubEventsContext = createContext<GameHubEventHandler>(
  new GameHubEventHandler()
);
