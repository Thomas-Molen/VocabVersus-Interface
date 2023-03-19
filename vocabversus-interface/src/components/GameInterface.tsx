import Title from "./Title";
import GameHubConnection from "./GameHubConnection";
import CommandInput from "./CommandInput";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

function GameInterface() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        width="100%"
      >
        <Title />
        <CommandInput />
      </Stack>
    </Box>
  );
}

export default GameInterface;
