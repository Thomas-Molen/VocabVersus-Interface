import { User } from "./User";
import { Game } from "./Game";

export class GameHub {
  userInformation: User;
  game: Game

  constructor(userInformation: User, game: Game) {
    this.userInformation = userInformation;
    this.game = game;
  }
}
