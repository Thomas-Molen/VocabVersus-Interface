import { GameState } from "./GameState";

export class Game {
    gameId: string;
    gameState: GameState;
    maxPlayers: number;
  
    constructor(gameId: string, gameState: GameState, maxPlayers: number) {
      this.gameId = gameId;
      this.maxPlayers = maxPlayers;
      this.gameState = gameState;
    }
  }