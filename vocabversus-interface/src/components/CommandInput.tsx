import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { useContext } from 'react';
import { GameHubContext } from './GameHubContext.js';
import { useState } from 'react'

function CommandInput() {
  const gameHubContext = useContext(GameHubContext);
  const [message, setMessage] = useState("");

  return (
    <Paper
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxWidth: "400px",
        backgroundColor: "rgb(255 255 255 / 87%)",
      }}
    >
      <form
        style={{
          display: "flex",
          width: "100%"
        }}
        onSubmit={(event) => {
          event.preventDefault();
          if (message) {
            gameHubContext.SendMessage(message)
            setMessage("");
          }
        }}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Command to Game"
          inputProps={{ "aria-label": "command to game" }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="default" sx={{ p: "10px" }} aria-label="send" type="submit">
          <SendIcon htmlColor="#242424" />
        </IconButton>
      </form>
    </Paper>
  );
}

export default CommandInput;
