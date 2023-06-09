import { useContext, useState } from "react";
import { Drawer, IconButton, SwipeableDrawer } from "@mui/material";
import MobiledataOffIcon from "@mui/icons-material/MobiledataOff";
import CheckIcon from "@mui/icons-material/Check";
import { GameHubStatesContext } from "../GameHub/GameHubContext";
import PlayerDetails from "./PlayerDetails";
import { Player } from "../models/Player";
import { GameState } from "../models/GameState";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ShareButton from "./ShareButton";
import Divider from "@mui/material/Divider";
import PlayerScore from "./PlayerScore";

function PlayersList() {
  const stateContext = useContext(GameHubStatesContext);
  const [showMobileList, setMobileShowList] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState<Player>()
  const [showDetails, setShowDetails] = useState(false);

  const list = (players: Player[]) => players.map((player, index) => {
    return (
      <div
        key={index}
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          paddingRight: "5px"
        }}
        onClick={() => {
          setSelectedPlayer(player);
          setShowDetails(true);
        }}
      >
        <h3>{player.username}</h3>
        {player.identifier === stateContext.GetHubInfo().userInformation.identifier && <h4>{"<- you"}</h4>}
        {!player.isConnected && <MobiledataOffIcon color="warning" />}
        {(player.isReady && stateContext.GetHubInfo().game.gameState === GameState.Lobby) && <CheckIcon color="success" />}
        {stateContext.GetHubInfo().game.gameState === GameState.Started &&
          <PlayerScore score={player.points}/>
        }
      </div>
    );
  })

  return (
    <>
      {/* Desktop view */}
      <SwipeableDrawer
        sx={{ display: { xs: 'block', sm: 'none' } }}
        anchor="left"
        open={showMobileList}
        onClose={() => setMobileShowList(false)}
        onOpen={() => setMobileShowList(true)}
        // Disable discovery for platform compatibility (IOS swipe features) and backdrop transition for performance on low powered devices
        disableDiscovery={true}
        disableBackdropTransition={true}
      >
        <ShareButton url={window.location.href} />
        <Divider />
        {list(stateContext.GetPlayers())}
      </SwipeableDrawer>

      {/* Mobile view */}
      <IconButton
        color="default"
        sx={{ p: "10px", display: { xs: 'block', sm: 'none' }, position: "absolute" }}
        aria-label="open-mobile-player-list"
        onClick={() => setMobileShowList(true)}
      >
        <MenuOpenIcon
          sx={{ WebkitTransform: "scaleX(-1)", transform: "scaleX(-1)" }}
          htmlColor={"#ffffffde"}
          fontSize="large" />
      </IconButton>
      <Drawer
        variant="permanent"
        sx={{ display: { xs: 'none', sm: 'block' } }}
        open
      >
        <ShareButton url={window.location.href} />
        <Divider />
        {list(stateContext.GetPlayers())}
      </Drawer>

      {/* Player details */}
      {showDetails &&
        <PlayerDetails player={selectedPlayer} showModal={true} onClose={() => setShowDetails(false)} />
      }
    </>
  );
}

export default PlayersList;
