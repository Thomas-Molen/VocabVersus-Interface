export class Player {
  username: string;
  identifier: string;
  isConnected: boolean;
  isReady: boolean;

  constructor(username: string, identifier: string, isConnected: boolean = true, isReady: boolean = false) {
    this.username = username;
    this.identifier = identifier;
    this.isConnected = isConnected;
    this.isReady = isReady
  }
}
