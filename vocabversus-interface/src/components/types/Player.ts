export class Player {
  username: string;
  identifier: string;
  isConnected: boolean;

  constructor(username: string, identifier: string) {
    this.username = username;
    this.identifier = identifier;
    this.isConnected = true;
  }
}
