import { createContext } from "react";
import {
  GameHubEventHandler,
} from "../../utility/GameHubEventsHandler";
import { Player } from "../types/Player";
import { User } from "../types/User";

export interface IGameHubCommands {
  JoinGame(username: string): Promise<any>;
  SetReady(readyState: boolean): Promise<any>;
  KickPlayer(playerIdentifier: string): Promise<any>;
}

export const GameHubCommandsContext = createContext<IGameHubCommands>({
  JoinGame: (username: string) => {
    return new Promise<void>((resolve, reject) =>
      console.log("JoinGame has not been set for GameHubCommandsContext")
    );
  },
  SetReady: (readyState: boolean) => {
    return new Promise<void>((resolve, reject) =>
      console.log("SetReady has not been set for GameHubCommandsContext")
    );
  },
  KickPlayer: (playerIdentifier: string) => {
    return new Promise<void>((resolve, reject) =>
      console.log("KickPlayer has not been set for GameHubCommandsContext")
    );
  },
});

export const GameHubEventsContext = createContext<GameHubEventHandler>(
  new GameHubEventHandler()
);

export interface IGameHubStates {
  GetPlayers(): Player[];
  SetPlayers(players: Player[]): void;
  GetHubInfo(): User;
}

export const GameHubStatesContext = createContext<IGameHubStates>({
  GetPlayers: () => {return []},
  SetPlayers: (players: Player[]) => console.log("SetPlayer has not been set for GameHubStatesContext"),
  GetHubInfo: () => {return new User("")},
});
