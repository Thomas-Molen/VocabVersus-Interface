import { useContext, useState, useEffect } from 'react';
import Title from "../Title";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import PlayersList from "../Social/PlayersList";
import ReadyButton from "./ReadyButton";
import { GameHubEventsContext, GameHubStatesContext } from "../GameHub/GameHubContext";
import { GameState } from "../models/GameState";
import { CountDownContext } from "./CountDownContext";
import { Button } from "@mui/material";
import Character from "./Character";
import WordInput from "./WordInput";

function GameInterface() {
  const stateContext = useContext(GameHubStatesContext);
  const countDownContext = useContext(CountDownContext);
  const eventHandler = useContext(GameHubEventsContext);
  const [lastWord, setLastWord] = useState("");

  useEffect(() => {
    // reset lastword when a new round starts
    eventHandler.On("start-round", () => setLastWord(""));
  }, [])

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
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={6}
              >
                {stateContext
                  .GetHubInfo()
                  .game.rounds.at(-1)
                  ?.requiredCharacters.map((char, i) => {
                    return (
                      <Character
                        character={char.toUpperCase()}
                        key={i}
                        wordToCompare={lastWord}
                      />
                    );
                  })}
              </Stack>
              {!stateContext.GetHubInfo().game.rounds.at(-1)?.isCompletedByPlayer && (
                <WordInput onSubmit={(word) => setLastWord(word)} />
              )}
            </>
          )}
        </Stack>
      </Box>
    </>
  );
}

export default GameInterface;
