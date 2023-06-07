import { useContext, useState, useEffect } from "react";
import Title from "../Title";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import PlayersList from "../Social/PlayersList";
import ReadyButton from "./ReadyButton";
import {
  EventHandlerContext,
  GameHubStatesContext,
} from "../GameHub/GameHubContext";
import { GameState } from "../models/GameState";
import WordInput from "./WordInput";
import FeedbackMessage from "./FeedbackMessage";
import CharacterDisplay from "./CharacterDisplay";

function GameInterface() {
  const stateContext = useContext(GameHubStatesContext);
  const eventHandler = useContext(EventHandlerContext);
  const [lastWord, setLastWord] = useState("");

  useEffect(() => {
    // reset lastword when a new round starts
    eventHandler.On(
      "start-round",
      () => setLastWord(""),
      "game-interface-clear-word-feedback"
    );
  }, []);

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
          spacing={10}
          width="100%"
        >
          {stateContext.GetHubInfo().game.gameState === GameState.Lobby && (
            <>
              <Title />
              <ReadyButton />
            </>
          )}
          {stateContext.GetHubInfo().game.gameState === GameState.Starting && (
            <>
              <Title />
            </>
          )}
          {stateContext.GetHubInfo().game.gameState === GameState.Started && (
            <>
              <FeedbackMessage />
              <Stack
                direction={{ xs: 'column', xsm: 'row' }}
                spacing={{ xs: 3, xsm: 3, md: 5 }}
                justifyContent="center"
                alignItems="center"
              >
                <CharacterDisplay
                  characters={stateContext.GetHubInfo().game.rounds.at(-1)?.requiredCharacters ?? []}
                  wordToCompare={lastWord}
                />
              </Stack>
              <WordInput visible={!stateContext.GetHubInfo().game.rounds.at(-1)?.isCompletedByPlayer} autoFocus onSubmit={(word) => setLastWord(word)} />
            </>
          )}
        </Stack>
      </Box>
    </>
  );
}

export default GameInterface;
