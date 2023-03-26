// TODO: MAKE THIS GENERIC

export class PlayerJoined {
  username: string;
  identifier: string;
  isConnected: boolean;

  constructor(username: string, identifier: string, isConnected: boolean = true) {
    this.username = username;
    this.identifier = identifier;
    this.isConnected = isConnected;
  }
}

class playerJoinedMethod{
  method: ((args: PlayerJoined) => void);
  identifier: string | undefined;

  constructor(method: ((args: PlayerJoined) => void), identifier : string | undefined) {
    this.method = method;
    this.identifier = identifier
  }
}

class playerLeftMethod{
  method: ((args: string) => void);
  identifier: string | undefined;

  constructor(method: ((args: string) => void), identifier : string | undefined) {
    this.method = method;
    this.identifier = identifier
  }
}

export class GameHubEventHandler {
  private _playerJoinedMethods: playerJoinedMethod[];
  private _playerLeftMethods: playerLeftMethod[];

  public constructor() {
    this._playerJoinedMethods = [];
    this._playerLeftMethods = [];
  }

  public OnPlayerJoined(newMethod: (args: PlayerJoined) => void, identifier? : string | undefined): void {
    // if an identifier was given, check if the identifier was already used to subscribe to handler
    if (identifier !== undefined && this._playerJoinedMethods.some(method => method.identifier === identifier)) return;
    
    this._playerJoinedMethods.push(new playerJoinedMethod(newMethod, identifier));
  }

  public InvokePlayerJoined(args: PlayerJoined) {
    if (!this._playerJoinedMethods) {
      // if no one subscribed, early return
      return;
    }

    for (const method of this._playerJoinedMethods) {
      try {
        method.method.apply(this, [args]);
      } catch (e) {
        console.log("Failed to invoke subscribed method: ", e);
      }
    }
  }

  public OnPlayerLeft(newMethod: (args: string) => void, identifier? : string | undefined): void {
    // if an identifier was given, check if the identifier was already used to subscribe to handler
    if (identifier !== undefined && this._playerLeftMethods.some(method => method.identifier === identifier)) return;
    
    this._playerLeftMethods.push(new playerLeftMethod(newMethod, identifier));
  }

  public InvokePlayerLeft(args: string) {
    if (!this._playerLeftMethods) {
      // if no one subscribed, early return
      return;
    }

    for (const method of this._playerLeftMethods) {
      try {
        method.method.apply(this, [args]);
      } catch (e) {
        console.log("Failed to invoke subscribed method: ", e);
      }
    }
  }
}
