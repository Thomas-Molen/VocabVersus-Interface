import { useContext } from "react";
import { Button, Modal, Paper } from "@mui/material";
import Stack from "@mui/material/Stack/Stack";
import { Player } from "../models/Player";
import "./PlayerDetails.css";
import { GameHubCommandsContext } from "../GameHub/GameHubContext";
import { GetErrorCode } from "../../utility/GameHubExceptionParser";

type PlayerDetailsProps = {
  player: Player | undefined;
  showModal: boolean;
  onClose: () => void;
};

function PlayerDetails({ player, showModal, onClose }: PlayerDetailsProps) {
  const gameHubCommandsContext = useContext(GameHubCommandsContext);

  if (player === undefined) {
    onClose();
    return <></>;
  }
  return (
    <Modal open={showModal} onClose={() => onClose()}>
      <>
        <Paper className="player-details-container" elevation={3}>
          <Stack direction="column" justifyContent="center" spacing={2}>
            <h1 style={{ margin: "0px", textAlign: "center" }}>
              {player.username}
            </h1>
            {!player.isConnected && (
              <Button
                variant="contained"
                color="error"
                size="large"
                onClick={() =>
                  gameHubCommandsContext
                    .KickPlayer(player.identifier)
                    .then(() => onClose())
                    .catch((error) => {
                      // User could not be kicked, most likely because he was still actively connected
                      const errorCode = GetErrorCode(error);
                      console.log("could not kick user");
                    })
                }
              >
                Kick
              </Button>
            )}
          </Stack>
        </Paper>
      </>
    </Modal>
  );
}

export default PlayerDetails;
