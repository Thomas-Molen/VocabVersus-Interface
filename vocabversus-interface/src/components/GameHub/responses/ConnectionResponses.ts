import { GameState } from "../../models/GameState";

interface GamePlayerRecord {
  username: string;
  isConnected: boolean;
  isReady: boolean;
}

export type JoinGameResponse = {
  players: {[key: string]: GamePlayerRecord};
}

export type ReJoinGameResponse = {
  players: {[key: string]: GamePlayerRecord};
  username: string;
}

export type CheckGameResponse = {
  gameId: string;
  gameState: GameState;
  playerCount: number;
  maxPlayerCount: number;
  personalIdentifier: string;
  canReconnect: boolean;
}
