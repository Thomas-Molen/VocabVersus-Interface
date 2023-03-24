export class JoinGameResponse {
  personalIdentifier: string;
  players: {[key: string]: string};

  constructor(personIdentifier: string, players: {[key: string]: string}){
    this.personalIdentifier = personIdentifier,
    this.players = players
  }
}
