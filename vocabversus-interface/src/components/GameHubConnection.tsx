import React, { useContext } from "react";
import { useEffect } from "react";
import { HubConnectionBuilder, LogLevel, HubConnection, HubConnectionState } from '@microsoft/signalr';
import { useNavigate } from "react-router-dom"
import { GameHubContext } from './GameHubContext.js';
import { PreLoaderContext } from "./PreLoaderContext.js";

type GameHubProps = {
    children: React.ReactNode;
};

type GameHubState = {
    hubConnection: HubConnection;
};

function GameHubConnection({ children }: GameHubProps) {
  const preLoaderContext = useContext(PreLoaderContext);

    const hubState: GameHubState = {
        // Create hub connection
        hubConnection: new HubConnectionBuilder()
            .withUrl(`${import.meta.env.VITE_GAME_HUB_BASE_URL}game`)
            .configureLogging(LogLevel.Information)
            .build(),
    };

    const navigate = useNavigate();
    function ConnectionFailed()
    {
        // If connection fails, redirect to origin
        navigate("/", {replace: true});
    }

    useEffect(() => {
        if (hubState.hubConnection.state === HubConnectionState.Disconnected) {
            preLoaderContext.EnablePreLoader();
            // Start the SignalR connection
            hubState.hubConnection.start()
                .then(() => {
                    // When SignalR connection is established, join given game from URI
                    //                                             remove the starting '/' from the path
                    return hubState.hubConnection.invoke<boolean>("Join", window.location.pathname.replace(/^\//, ""))
                })
                // Catch errors occurred in starting the connection or joining the game
                .catch(() => ConnectionFailed())
                .finally(() => preLoaderContext.DisablePreLoader());

            // register hub callbacks
            hubState.hubConnection.on("ReceiveMessage", (message: string) => {
                console.log(`${message}`);
            });
        }
    }, []);

    // register hub commands
    const SendMessage = (message: string) => {
        hubState.hubConnection.invoke("SendMessage", message);
    }

    return (
        <div id="gamehub">
            <GameHubContext.Provider value={{
                SendMessage: (message) => SendMessage(message),
            }}>
                {children}
            </GameHubContext.Provider>
        </div>
    )
}

export default GameHubConnection