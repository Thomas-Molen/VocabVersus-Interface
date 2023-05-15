import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { useState, useContext } from "react";
import { GameHubCommandsContext } from "../GameHub/GameHubContext";

type WordInputProps = {
  onSubmit(word: string): void;
};

function WordInput({ onSubmit }: WordInputProps) {
  const gameHubCommandsContext = useContext(GameHubCommandsContext);
  const [word, setWord] = useState("");

  return (
    <Paper
      sx={{
        p: "2px 0px",
        width: "100%",
        maxWidth: "400px",
      }}
    >
      <form
        style={{
          display: "flex",
          alignItems: "center",
        }}
        onSubmit={(event) => {
          event.preventDefault();
          if (word) {
            gameHubCommandsContext.SubmitWord(word.trim());
            onSubmit(word);
            setWord("");
          }
        }}
      >
        <InputBase
          autoFocus
          sx={{ ml: 1, flex: 1 }}
          placeholder="Insert Word"
          inputProps={{ "aria-label": "insert word" }}
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          color="default"
          sx={{ p: "10px" }}
          aria-label="send"
          type="submit"
        >
          <SendIcon htmlColor={word ? "#ffffffde" : "#242424"} />
        </IconButton>
      </form>
    </Paper>
  );
}

export default WordInput;
