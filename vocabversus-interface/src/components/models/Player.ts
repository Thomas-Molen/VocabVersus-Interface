export class Player {
  username: string;
  identifier: string;
  isConnected: boolean;
  isReady: boolean;
  points: number;

  constructor(username: string, identifier: string, isConnected: boolean = true, isReady: boolean = false, points: number = 0) {
    this.username = username;
    this.identifier = identifier;
    this.isConnected = isConnected;
    this.isReady = isReady;
    this.points = points;
  }
}
