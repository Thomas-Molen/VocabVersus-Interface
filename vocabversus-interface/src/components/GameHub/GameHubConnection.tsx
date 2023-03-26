import React, { useContext } from "react";
import { useEffect, useState } from "react";
import {
  HubConnectionBuilder,
  LogLevel,
  HubConnection,
  HubConnectionState,
} from "@microsoft/signalr";
import { useNavigate } from "react-router-dom";
import { GameHubCommandsContext, GameHubEventsContext } from "./GameHubContext";
import { PreLoaderContext } from "../PreLoaderContext.js";
import GameHubRegistration from "./GameHubRegistration.js";
import { IGameHubCommands } from "./IGameHubCommands.js";
import { JoinGameResponse } from "./responses/ConnectionResponses";
import {
  GameHubEventHandler,
  PlayerJoined,
} from "../../utility/GameHubEventsHandler.js";

type GameHubProps = {
  children: React.ReactNode;
};

function GameHubConnection({ children }: GameHubProps) {
  const preLoaderContext = useContext(PreLoaderContext);

  // Get the gameId from URI                         remove the starting '/' from the path
  const [gameId] = useState(window.location.pathname.replace(/^\//, ""));
  const [hubConnection] = useState(
    new HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_GAME_HUB_BASE_URL}game`)
      .configureLogging(LogLevel.Information)
      .build()
  );
  const [gameHubEvents] = useState(new GameHubEventHandler());
  const [showRegistration, setShowRegistration] = useState(false);

  const navigate = useNavigate();
  function ConnectionFailed() {
    // If connection fails, redirect to origin
    navigate("/", { replace: true });
  }

  useEffect(() => {
    if (hubConnection.state === HubConnectionState.Disconnected) {
      preLoaderContext.EnablePreLoader();
      // Start the SignalR connection
      hubConnection
        .start()
        .then(() => {
          // When SignalR connection is established, check the given game user is trying to connect to
          return hubConnection.invoke<boolean>("CheckGame", gameId);
        })
        .then(() => {
          return setShowRegistration(true);
        })
        // Catch errors occurred in starting the connection or joining the game
        .catch(() => ConnectionFailed())
        .finally(() => preLoaderContext.DisablePreLoader());

      // register connection handlers
      hubConnection.onclose(() => ConnectionFailed());
      // register hub callbacks
      // register them here directly as registering them through data providers and useEffect will cause them to duplicate during hot-reloading
      hubConnection.on("UserJoined", (username: string, userIdentifier: string) => {
        gameHubEvents.InvokePlayerJoined(new PlayerJoined(username, userIdentifier));
      });
      hubConnection.on("UserLeft", (userIdentifier: string) => {
        gameHubEvents.InvokePlayerLeft(userIdentifier);
      });
    }
  }, []);

  // setup all commands to be
  const commands: IGameHubCommands = {
    JoinGame: (username) => {
      return hubConnection
        .invoke<JoinGameResponse>("Join", gameId, username)
        .then((gameInfo) => {
          // Go through all already joined players, and invoke the player joined event for them
          Object.keys(gameInfo.players).map((key) =>
            gameHubEvents.InvokePlayerJoined(
              new PlayerJoined(
                `${gameInfo.players[key].username} ${
                  key == gameInfo.personalIdentifier ? "<- (you)" : ""
                }`,
                key,
                gameInfo.players[key].isConnected
              )
            )
          );
        });
    },
  };

  return (
    <div id="gamehub">
      <GameHubCommandsContext.Provider value={commands}>
        <GameHubEventsContext.Provider value={gameHubEvents}>
          {showRegistration && <GameHubRegistration />}
          {children}
        </GameHubEventsContext.Provider>
      </GameHubCommandsContext.Provider>
    </div>
  );
}

export default GameHubConnection;
