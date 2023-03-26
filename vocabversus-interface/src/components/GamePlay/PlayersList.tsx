import Login from "@mui/icons-material/Login";
import { Drawer, IconButton, Paper } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { GameHubEventsContext } from "../GameHub/GameHubContext";
import { Player } from "../types/Player";
import MobiledataOffIcon from "@mui/icons-material/MobiledataOff";

function PlayersList() {
  const gameHubEvents = useContext(GameHubEventsContext);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    gameHubEvents.OnPlayerJoined((playerJoined) => {
      setPlayers((prevPlayers) => [
        ...prevPlayers,
        new Player(playerJoined.username, playerJoined.identifier, playerJoined.isConnected),
      ]);
    }, "player-list");

    gameHubEvents.OnPlayerLeft((playerIdentifier) => {
      setPlayers((prevPlayers) => {
        return prevPlayers.map(player => {
          console.log(player);
          if (player.identifier === playerIdentifier) {
            player.isConnected = false;
          }
          return player;
        })
      })
    }, "player-list");
  }, []);

  return (
    <>
      <Drawer
        variant="permanent"
        sx={
          {
            // only display on certain breakpoints
            // display: { sm: "none", md: "block" },
          }
        }
        open
      >
        {players.map((player, index) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              // TODO: Add modal for player actions
              onClick={() => console.log("open player actionsx")}
            >
              <h3>{player.username}</h3>
              {!player.isConnected && <MobiledataOffIcon color="warning" />}
            </div>
          );
        })}
      </Drawer>
    </>
  );
}

export default PlayersList;
