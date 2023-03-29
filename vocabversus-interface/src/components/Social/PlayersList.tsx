import { useContext, useState } from "react";
import { Drawer } from "@mui/material";
import MobiledataOffIcon from "@mui/icons-material/MobiledataOff";
import CheckIcon from "@mui/icons-material/Check";
import { GameHubStatesContext } from "../GameHub/GameHubContext";
import PlayerDetails from "./PlayerDetails";
import { Player } from "../types/Player";

function PlayersList() {
  const stateContext = useContext(GameHubStatesContext);
  const [selectedPlayer, setSelectedPlayer] = useState<Player>()
  const [showDetails, setShowDetails] = useState(false);

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
        {stateContext.GetPlayers().map((player, index) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              // TODO: Add modal for player actions
              onClick={() => {
                setSelectedPlayer(player);
                setShowDetails(true);
              }}
            >
              <h3>{player.username}</h3>
              {player.identifier === stateContext.GetHubInfo().identifier && <h4>{"<- you"}</h4>}
              {!player.isConnected && <MobiledataOffIcon color="warning" />}
              {player.isReady && <CheckIcon color="success" />}
            </div>
          );
        })}
      </Drawer>
      {showDetails &&
      <PlayerDetails player={selectedPlayer} showModal={true} onClose={() => setShowDetails(false)}/>
      }
    </>
  );
}

export default PlayersList;
