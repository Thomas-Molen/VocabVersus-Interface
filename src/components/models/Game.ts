import { GameRound } from "./GameRound";
import { GameState } from "./GameState";

export class Game {
    gameId: string;
    gameState: GameState;
    maxPlayers: number;
    rounds: GameRound[];
    wordInput: string;
    isPasswordProtected: boolean;
  
    constructor(gameId: string, gameState: GameState, maxPlayers: number, isPasswordProtected: boolean = false, rounds: GameRound[] = [], wordInput: string = "") {
      this.gameId = gameId;
      this.maxPlayers = maxPlayers;
      this.isPasswordProtected = isPasswordProtected;
      this.gameState = gameState;
      this.rounds = rounds;
      this.wordInput = wordInput;
    }
  }