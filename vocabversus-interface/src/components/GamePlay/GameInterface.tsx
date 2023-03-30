import { useContext } from "react";
import Title from "../Title";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import PlayersList from "../Social/PlayersList";
import ReadyButton from "./ReadyButton";
import { GameHubStatesContext } from "../GameHub/GameHubContext";
import { GameState } from "../models/GameState";
import { CountDownContext } from "./CountDownContext";
import { Button } from "@mui/material";


function GameInterface() {
  const stateContext = useContext(GameHubStatesContext);
  const countDownContext = useContext(CountDownContext);

  return (
    <>
      <PlayersList />
      <Box
        sx={{ minHeight: "100vh", display: "flex", justifyContent: "center" }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          width="100%"
        >
          <Title />
          {stateContext.GetHubInfo().game.gameState === GameState.Lobby && (
            <ReadyButton />
          )}
          {stateContext.GetHubInfo().game.gameState === GameState.Started &&
            <h1>game has started WOOOO!</h1>
          }
          <Button onClick={() => countDownContext.SetCountDown(Date.now()+10000)}>
            Start Timer
          </Button>
        </Stack>
      </Box>
    </>
  );
}

export default GameInterface;
