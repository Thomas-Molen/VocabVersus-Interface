export class Player {
  username: string;
  identifier: string;
  isConnected: boolean;

  constructor(username: string, identifier: string, isConnected: boolean = true) {
    this.username = username;
    this.identifier = identifier;
    this.isConnected = isConnected;
  }
}
