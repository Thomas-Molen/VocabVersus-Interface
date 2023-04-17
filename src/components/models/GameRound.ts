export class GameRound {
    requiredCharacters: string[]
    isCompletedByPlayer: boolean;
  
    constructor(requiredCharacters: string[], isCompletedByPlayer: boolean = false) {
      this.requiredCharacters = requiredCharacters;
      this.isCompletedByPlayer = isCompletedByPlayer;
    }
  }