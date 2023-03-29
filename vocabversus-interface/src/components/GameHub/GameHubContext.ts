import { createContext } from "react";
import {
  GameHubEventHandler,
} from "../../utility/GameHubEventsHandler";
import { Game } from "../models/Game";
import { GameHub } from "../models/GameHub";
import { GameState } from "../models/GameState";
import { Player } from "../models/Player";
import { User } from "../models/User";

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
  GetHubInfo(): GameHub;
}

export const GameHubStatesContext = createContext<IGameHubStates>({
  GetPlayers: () => {return []},
  SetPlayers: (players: Player[]) => console.log("SetPlayer has not been set for GameHubStatesContext"),
  GetHubInfo: () => {return new GameHub(new User(""), new Game("", GameState.Lobby, 0))},
});
