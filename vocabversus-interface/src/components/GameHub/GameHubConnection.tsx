import React, { useContext } from "react";
import { useEffect, useState } from "react";
import {
  HubConnectionBuilder,
  LogLevel,
  HubConnection,
  HubConnectionState,
} from "@microsoft/signalr";
import { useNavigate } from "react-router-dom";
import { GameHubContext } from "./GameHubContext.js";
import { PreLoaderContext } from "../PreLoaderContext.js";
import GameHubRegistration from "./GameHubRegistration.js";
import { IGameHubCommands } from "./GameHubCommands.js";
import { Player } from "../types/Player.js";
import { JoinGameResponse } from "./responses/ConnectionResponses";

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

  const [showRegistration, setShowRegistration] = useState(false);

  // TODO: Remove this temp users list
  const [players, setPlayers] = useState<Player[]>([]);

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
        .then(() => setShowRegistration(true))
        // Catch errors occurred in starting the connection or joining the game
        .catch(() => ConnectionFailed())
        .finally(() => preLoaderContext.DisablePreLoader());

      // register connection handlers
      hubConnection.onclose(() => ConnectionFailed());
      // register hub callbacks
      hubConnection.on("UserJoined", (username: string) => {
        setPlayers((prevPlayers) => [...prevPlayers, new Player(username)]);
      });
    }
  }, []);

  // setup all commands to be
  const commands: IGameHubCommands = {
    JoinGame: (username) => {
      return hubConnection
        .invoke<JoinGameResponse>("Join", gameId, username)
        .then((gameInfo) => {
          // Set new players
          let newPlayers: Player[] = [];
          Object.keys(gameInfo.players).map((key) =>
            newPlayers.push(
              new Player(
                `${gameInfo.players[key]} ${
                  key == gameInfo.personalIdentifier ? "<- (you)" : ""
                }`
              )
            )
          );
          setPlayers(newPlayers);
        });
    },
  };

  return (
    <div id="gamehub">
      {players.map((player, index) => {
        return (
          <div key={index}>
            <h2>{player.username}</h2>
          </div>
        );
      })}
      <GameHubContext.Provider value={commands}>
        {showRegistration && <GameHubRegistration />}
        {children}
      </GameHubContext.Provider>
    </div>
  );
}

export default GameHubConnection;
