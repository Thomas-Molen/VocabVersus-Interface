import React, { useContext } from "react";
import { useEffect, useState } from "react";
import {
  HubConnectionBuilder,
  LogLevel,
  HubConnectionState,
} from "@microsoft/signalr";
import { useNavigate } from "react-router-dom";
import {
  GameHubCommandsContext,
  GameHubStatesContext,
  IGameHubCommands,
  IGameHubStates,
} from "./GameHubContext";
import { PreLoaderContext } from "../PreLoaderContext.js";
import GameHubRegistration from "./GameHubRegistration.js";
import {
  CheckGameResponse,
  JoinGameResponse,
} from "./responses/ConnectionResponses";
import { Player } from "../models/Player";
import { User } from "../models/User";
import { GameHub } from "../models/GameHub";
import { Game } from "../models/Game";
import { GameState } from "../models/GameState";
import { CountDownContext } from "../GamePlay/CountDownContext";
import { GameRound } from "../models/GameRound";

type GameHubProps = {
  children: React.ReactNode;
};

function GameHubConnection({ children }: GameHubProps) {
  const preLoaderContext = useContext(PreLoaderContext);
  const countDownContext = useContext(CountDownContext);

  const [user, setUser] = useState<User>(new User(""));
  // Get the gameId from URI
  const [game, setGame] = useState<Game>(
    new Game(window.location.pathname.replace(/^\//, ""), GameState.Lobby, 0)
  );
  const [hubConnection] = useState(
    new HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_GAME_HUB_BASE_URL}game`)
      .configureLogging(LogLevel.Information)
      .build()
  );
  const [showRegistration, setShowRegistration] = useState(false);
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
          return hubConnection
            .invoke<CheckGameResponse>("CheckGame", game.gameId)
            .then((gameInfo) => {
              setGame({
                ...game,
                gameState: gameInfo.gameState,
                maxPlayers: gameInfo.maxPlayerCount,
              });
            });
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
      // User connection
      hubConnection.on(
        "UserJoined",
        (username: string, userIdentifier: string) =>
          setPlayers((prevPlayers) => [
            ...prevPlayers,
            new Player(username, userIdentifier),
          ])
      );
      hubConnection.on("UserLeft", (userIdentifier: string) => {
        setPlayers((prevPlayers) => {
          return prevPlayers.map((player) => {
            if (player.identifier === userIdentifier) {
              player.isConnected = false;
            }
            return player;
          });
        });
      });
      hubConnection.on("UserRemoved", (userIdentifier: string) => {
        setPlayers((prevPlayers) =>
          prevPlayers.filter((p) => p.identifier !== userIdentifier)
        );
      });

      // User actions
      hubConnection.on(
        "UserReady",
        (readyState: boolean, userIdentifier: string) => {
          setPlayers((prevPlayers) => {
            return prevPlayers.map((player) => {
              if (player.identifier === userIdentifier) {
                player.isReady = readyState;
              }
              return player;
            });
          });
        }
      );

      // Game Events
      hubConnection.on("GameStarting", (startTimeUnix: number) => {
        countDownContext.SetCountDown(startTimeUnix, false);
      });
      hubConnection.on("GameStateChanged", (gameState: GameState) => {
        setGame((game) => {
          return { ...game, gameState: gameState };
        });
      });
      hubConnection.on("StartRound", (gameRound: GameRound) => {
        console.log(`round started: ${gameRound}`);
      });
    }
  }, []);

  // setup all commands to be
  const commands: IGameHubCommands = {
    JoinGame: (username) => {
      return hubConnection
        .invoke<JoinGameResponse>("Join", game.gameId, username)
        .then((gameInfo) => {
          setUser(new User(gameInfo.personalIdentifier));
          // Go through all already joined players, and invoke the player joined event for them
          Object.keys(gameInfo.players).map((key) =>
            setPlayers((prevPlayers) => [
              ...prevPlayers,
              new Player(
                gameInfo.players[key].username,
                key,
                gameInfo.players[key].isConnected,
                gameInfo.players[key].isReady
              ),
            ])
          );
        });
    },
    SetReady: (readyState) => {
      return hubConnection.invoke("Ready", game.gameId, readyState);
    },
    KickPlayer: (playerIdentifier) => {
      return hubConnection
        .invoke("Kick", game.gameId, playerIdentifier)
        .then(() => {
          setPlayers((prevPlayers) =>
            prevPlayers.filter((p) => p.identifier !== playerIdentifier)
          );
        });
    },
  };

  const states: IGameHubStates = {
    GetPlayers: () => {
      return players;
    },
    SetPlayers: (newPlayers) => setPlayers(newPlayers),
    GetHubInfo: () => {
      return new GameHub(user, game);
    },
  };

  return (
    <div id="gamehub">
      <GameHubCommandsContext.Provider value={commands}>
        <GameHubStatesContext.Provider value={states}>
          {showRegistration && <GameHubRegistration />}
          {children}
        </GameHubStatesContext.Provider>
      </GameHubCommandsContext.Provider>
    </div>
  );
}

export default GameHubConnection;
