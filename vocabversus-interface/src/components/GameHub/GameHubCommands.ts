export interface IGameHubCommands {
  JoinGame(username: string): Promise<any>;
}
