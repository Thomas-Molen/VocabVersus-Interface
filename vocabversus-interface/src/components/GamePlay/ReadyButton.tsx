import { Button } from "@mui/material";
import { useContext } from "react";
import { GameHubCommandsContext, GameHubStatesContext } from "../GameHub/GameHubContext";

function ReadyButton() {
  const stateContext = useContext(GameHubStatesContext);
  const gameHubCommandsContext = useContext(GameHubCommandsContext);

  return (
    <>
      <Button
        variant={
          stateContext.GetPlayers().some(
            (player) => player.identifier === stateContext.GetHubInfo().userInformation.identifier && player.isReady
          )
            ? "contained"
            : "outlined"
        }
        size="large"
        onClick={() => {
          let newPlayers = stateContext.GetPlayers().map((player) => {
            if (player.identifier === stateContext.GetHubInfo().userInformation.identifier) {
              gameHubCommandsContext.SetReady(!player.isReady);
              return { ...player, isReady: !player.isReady };
            }
            return player;
          });
          stateContext.SetPlayers(newPlayers);
        }}
      >
        Ready
      </Button>
    </>
  );
}

export default ReadyButton;
