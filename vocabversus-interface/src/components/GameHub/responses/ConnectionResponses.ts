import { GameState } from "../../models/GameState";

interface GamePlayerRecord {
  username: string;
  isConnected: boolean;
  isReady: boolean;
}

export type JoinGameResponse = {
  personalIdentifier: string;
  players: {[key: string]: GamePlayerRecord};
}

export type CheckGameResponse = {
  gameId: string;
  gameState: GameState;
  playerCount: number;
  maxPlayerCount: number;
}
