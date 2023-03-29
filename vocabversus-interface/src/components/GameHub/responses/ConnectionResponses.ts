interface GamePlayerRecord {
  username: string;
  isConnected: boolean;
  isReady: boolean;
}

export class JoinGameResponse {
  personalIdentifier: string;
  players: {[key: string]: GamePlayerRecord};

  constructor(personIdentifier: string, players: {[key: string]: GamePlayerRecord}){
    this.personalIdentifier = personIdentifier,
    this.players = players
  }
}
