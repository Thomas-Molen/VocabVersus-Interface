import Title from "../Title";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import PlayersList from "./PlayersList";

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
        </Stack>
      </Box>
    </>
  );
}

export default GameInterface;
