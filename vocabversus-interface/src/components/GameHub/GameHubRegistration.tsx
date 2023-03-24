import { useContext, useState } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper/Paper";
import { Box, Divider, InputBase, TextField } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Login from "@mui/icons-material/Login";
import { GameHubContext } from "./GameHubContext";
import { GameHubExceptionCode, GetErrorCode } from '../../utility/GameHubExceptionParser'

//declare the const and add the material UI style
const UsernameInput = styled(TextField)({
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});

function GameHubRegistration() {
  const [username, setUsername] = useState("");
  const [showRegistration, setShowRegistration] = useState(true);
  const gameHubContext = useContext(GameHubContext);

  return (
    <Modal open={showRegistration}>
      <Paper
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          p: 2,
          outline: "none",
        }}
        elevation={3}
      >
        <form
          style={{
            display: "flex",
            width: "100%",
          }}
          onSubmit={(event) => {
            event.preventDefault();
            if (username) {
              gameHubContext.JoinGame(username)
                .catch((error) => {
                  const errorCode = GetErrorCode(error)
                  if (errorCode === GameHubExceptionCode.UserAddFailed)
                  {
                    console.log("user failed to join");
                    // show error message for user failed to join
                  }
                  else
                  {
                    console.log("some other error: ", errorCode);
                    // handle unexpected errors
                  }
                })
                .then(() => {
                  // disable registration as user has joined successfully
                  setShowRegistration(false);
                });
            }
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <UsernameInput
              id="register-username-input1"
              key="register-username-input2"
              label="username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <IconButton
              disabled={username ? false : true}
              sx={{ p: "4px" }}
              aria-label="send"
              type="submit"
            >
              <Login sx={{ color: "ffffffde" }} fontSize="large" />
            </IconButton>
          </Box>
        </form>
      </Paper>
    </Modal>
  );
}

export default GameHubRegistration;
