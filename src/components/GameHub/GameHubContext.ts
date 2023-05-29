import { createContext } from "react";
import { Game } from "../models/Game";
import { GameHub } from "../models/GameHub";
import { GameState } from "../models/GameState";
import { Player } from "../models/Player";
import { User } from "../models/User";
import { GameHubEventHandler } from "../../utility/GameHubEventHandler";

export interface IGameHubCommands {
  JoinGame(username: string, password: string | null): Promise<any>;
  SetReady(readyState: boolean): Promise<any>;
  KickPlayer(playerIdentifier: string): Promise<any>;
  SubmitWord(word: string): Promise<any>;
}

export const GameHubCommandsContext = createContext<IGameHubCommands>({
  JoinGame: (username: string, password: string | null) => {
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
  SubmitWord: (word: string) => {
    return new Promise<void>((resolve, reject) =>
      console.log("SubmitWord has not been set for GameHubCommandsContext")
    );
  }
});

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

export const EventHandlerContext = createContext(
  new GameHubEventHandler()
)
