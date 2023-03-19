import React from "react";
import { useState, useEffect } from "react";
import { HubConnectionBuilder, LogLevel, HubConnection, HubConnectionState } from '@microsoft/signalr';
import { GameHubContext } from './GameHubContext.js';

type GameHubProps = {
    children: React.ReactNode;
};

type GameHubState = {
    hubConnection: HubConnection;
};

function GameHubConnection({ children }: GameHubProps) {
    const hubState: GameHubState = {
        // Create hub connection
        hubConnection: new HubConnectionBuilder()
            .withUrl(`${import.meta.env.VITE_GAME_HUB_BASE_URL}game`)
            .configureLogging(LogLevel.Information)
            .build(),
    };

    function ConnectionFailed()
    {
        console.log("Connection to game failed");
    }

    useEffect(() => {
        if (hubState.hubConnection.state === HubConnectionState.Disconnected) {
            // Start the SignalR connection
            hubState.hubConnection.start()
                .then(() => {
                    // When SignalR connection is established, join given game from URI
                    //                                             remove the starting '/' from the path
                    hubState.hubConnection.invoke<boolean>("Join", window.location.pathname.replace(/^\//, ""))
                    .catch(() => ConnectionFailed())
                        .then(result => {
                            // If result is false, game could not be joined
                            if (!result) ConnectionFailed()
                        })
                });

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