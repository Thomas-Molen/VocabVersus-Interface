import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { HubConnectionBuilder, LogLevel, HubConnection, HubConnectionState } from '@microsoft/signalr';
import { useNavigate } from "react-router-dom"
import { GameHubContext } from './GameHubContext.js';
import { PreLoaderContext } from "./PreLoaderContext.js";
import GameHubRegistration from "./GameHubRegistration.js";

type GameHubProps = {
    children: React.ReactNode;
};

function GameHubConnection({ children }: GameHubProps) {
    const preLoaderContext = useContext(PreLoaderContext);

    // Get the gameId from URI                         remove the starting '/' from the path
    const [gameId] = useState(window.location.pathname.replace(/^\//, ""));
    const [hubConnection] = useState(new HubConnectionBuilder()
    .withUrl(`${import.meta.env.VITE_GAME_HUB_BASE_URL}game`)
    .configureLogging(LogLevel.Information)
    .build());

    const navigate = useNavigate();
    function ConnectionFailed() {
        // If connection fails, redirect to origin
        navigate("/", { replace: true });
    }

    useEffect(() => {
        if (hubConnection.state === HubConnectionState.Disconnected) {
            preLoaderContext.EnablePreLoader();
            // Start the SignalR connection
            hubConnection.start()
                .then(() => {
                    // When SignalR connection is established, join the game referenced with the gameId
                    return hubConnection.invoke<boolean>("Connect", gameId)
                })
                // Catch errors occurred in starting the connection or joining the game
                .catch(() => ConnectionFailed())
                .finally(() => preLoaderContext.DisablePreLoader());

            // register connection handlers
            hubConnection.onclose(() => ConnectionFailed());
            // register hub callbacks
            hubConnection.on("UserJoined", (username: string) => {
                console.log(`${username} joined the game`);
            });
        }
    }, []);

    const JoinGame = (username: string) => {
        hubConnection.invoke("Join", gameId, username);
    }

    return (
        <div id="gamehub">
            <button onClick={() => console.log(hubConnection)}>hubConnection</button>
            <GameHubContext.Provider value={{
                JoinGame: (username) => JoinGame(username),
            }}>
                <GameHubRegistration />
                {children}
            </GameHubContext.Provider>
        </div>
    )
}

export default GameHubConnection