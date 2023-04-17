class Method{
  method: ((args: any) => void);
  call: string;
  identifier: string | undefined;
  constructor(method: ((args: any) => void), call: string, identifier: string | undefined) {
    this.method = method;
    this.call = call;
    this.identifier = identifier
  }
}

export class GameHubEventHandler {
  private _methods: Method[];

  public constructor() {
    this._methods = [];
  }

  public On<ArgType>(call: string, newMethod: (args: ArgType) => void, identifier?: string | undefined): void {
    // if an identifier was given, check if the identifier was already used to subscribe to handler
    if (identifier !== undefined && this._methods.some(method => method.identifier === identifier && method.call === call)) return;
    this._methods.push(new Method(newMethod, call, identifier));
  }

  public InvokeMethod<ArgType>(call: string, args?: ArgType)
  {
    // if no one subscribed, early return
    if (!this._methods.filter(m => m.call === call)) return;

    for (const method of this._methods.filter(m => m.call === call)) {
      try {
        method.method(args);
      } catch (e) {
        console.log("Failed to invoke subscribed method: ", e);
      }
    }
  }
}
