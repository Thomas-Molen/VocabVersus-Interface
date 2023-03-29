import { useContext, useState } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper/Paper";
import {
  Alert,
  AlertTitle,
  Collapse,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Login from "@mui/icons-material/Login";
import { GameHubCommandsContext } from "./GameHubContext";
import {
  GameHubExceptionCode,
  GetErrorCode,
} from "../../utility/GameHubExceptionParser";
import "./GameHubRegistration.css";

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

const RegistrationErrorCollpase = styled(Collapse)({
  "&.MuiCollapse-entered": {
    paddingBottom: "20px",
  },
});

function GameHubRegistration() {
  const [username, setUsername] = useState("");
  const [showRegistration, setShowRegistration] = useState(true);
  const [showJoinError, setShowJoinError] = useState(false);
  const gameHubCommandsContext = useContext(GameHubCommandsContext);

  return (
    <Modal open={showRegistration}>
      <>
        <Paper className="registration-container" elevation={3}>
          <RegistrationErrorCollpase in={showJoinError}>
            <Alert
              variant="outlined"
              severity="error"
              onClose={() => setShowJoinError(false)}
            >
              <AlertTitle>Failed to join</AlertTitle>
              game might be full or you already joined in a different window
            </Alert>
          </RegistrationErrorCollpase>
          <form
            style={{
              paddingLeft: "10px",
              paddingRight: "10px",
              display: "flex",
            }}
            onSubmit={(event) => {
              event.preventDefault();
              if (username) {
                gameHubCommandsContext
                  .JoinGame(username)
                  .then(() => {
                    // disable registration as user has joined successfully
                    return setShowRegistration(false);
                  })
                  .catch((error) => {
                    const errorCode = GetErrorCode(error);
                    // show error message for user failed to join
                    if (errorCode === GameHubExceptionCode.UserAddFailed) {
                      setShowJoinError(true);
                    }
                  });
              }
            }}
          >
            <UsernameInput
              fullWidth
              autoFocus
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
          </form>
        </Paper>
      </>
    </Modal>
  );
}

export default GameHubRegistration;
