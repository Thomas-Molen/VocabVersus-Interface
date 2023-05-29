import { useContext, useState } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper/Paper";
import {
  Alert,
  AlertTitle,
  Collapse,
  TextField,
  InputAdornment
} from "@mui/material";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Login from "@mui/icons-material/Login";
import { GameHubCommandsContext } from "./GameHubContext";
import {
  GameHubExceptionCode,
  GetErrorCode,
} from "../../utility/GameHubExceptionParser";
import "./GameHubRegistration.css";

//declare the const and add the material UI style
const TextInput = styled(TextField)({
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

type GameHubRegistrationProps = {
  showPassword: boolean;
};

function GameHubRegistration({ showPassword = false }: GameHubRegistrationProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState<string | null>(null);
  const [showPasswordText, setShowPasswordText] = useState(false);
  const [showRegistration, setShowRegistration] = useState(true);
  const [showJoinError, setShowJoinError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const gameHubCommandsContext = useContext(GameHubCommandsContext);

  return (
    <Modal open={showRegistration}>
      <>
        <Paper className="registration-container" elevation={3} sx={{maxWidth: (showPassword ? "none" : "20rem")}}>
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
          <RegistrationErrorCollpase in={showPasswordError} >
            <Alert
              variant="outlined"
              severity="error"
              onClose={() => setShowPasswordError(false)}
            >
              <AlertTitle>Incorrect password</AlertTitle>
              game is password protected
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
                  .JoinGame(username, password)
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
                    if (errorCode === GameHubExceptionCode.AuthenticationFailed) {
                      setShowPasswordError(true);
                    }
                  });
              }
            }}
          >
            <>
              {showPassword &&
                <TextInput
                  fullWidth
                  autoFocus
                  label="password"
                  type={showPasswordText ? "text" : "password"}
                  variant="outlined"
                  value={password ?? ""}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ marginRight: "5px" }}
                  inputProps={{ minLength: 1 }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPasswordText(!showPasswordText)}
                        edge="end"
                      >
                        {showPasswordText ? <Visibility /> : <VisibilityOff sx={{ color: "#ffffff99" }} />}
                      </IconButton>
                    </InputAdornment>
                  }}
                />
              }
              <TextInput
                fullWidth
                autoFocus
                label="username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                inputProps={{ minLength: 1, maxLength: 20 }}
                sx={{ maxWidth: "300px" }}
              />
            </>
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
