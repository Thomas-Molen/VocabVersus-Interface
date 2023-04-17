import { GameRound } from "./GameRound";
import { GameState } from "./GameState";

export class Game {
    gameId: string;
    gameState: GameState;
    maxPlayers: number;
    rounds: GameRound[];
    wordInput: string;
  
    constructor(gameId: string, gameState: GameState, maxPlayers: number, rounds: GameRound[] = [], wordInput: string = "") {
      this.gameId = gameId;
      this.maxPlayers = maxPlayers;
      this.gameState = gameState;
      this.rounds = rounds;
      this.wordInput = wordInput;
    }
  }