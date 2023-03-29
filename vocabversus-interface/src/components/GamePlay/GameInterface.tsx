import Title from "../Title";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import PlayersList from "../Social/PlayersList";
import ReadyButton from "./ReadyButton";

function GameInterface() {
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
          <ReadyButton />
        </Stack>
      </Box>
    </>
  );
}

export default GameInterface;
