import { GameRound } from "../../models/GameRound";
import { GameState } from "../../models/GameState";

interface GamePlayerRecord {
  username: string;
  isConnected: boolean;
  isReady: boolean;
  points: number;
}

export type JoinGameResponse = {
  players: {[key: string]: GamePlayerRecord};
  rounds: GameRound[];
}

export type ReJoinGameResponse = {
  players: {[key: string]: GamePlayerRecord};
  rounds: GameRound[];
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

export type SubmitResponse = {
  isCorrect: boolean;
}
