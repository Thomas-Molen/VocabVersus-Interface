import { useState } from 'react'
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper/Paper';
import { Box, Divider, InputBase, TextField } from '@mui/material';
import { withStyles } from '@mui/styles';
import IconButton from "@mui/material/IconButton";
import Login from "@mui/icons-material/Login";

function GameHubRegistration() {
  const [username, setUsername] = useState("");

  //declare the const and add the material UI style
const CustomizedTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'yellow',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'yellow',
      },
    },
  },
})(TextField);

  return (
    <Modal
      open={true}
    >
      <Paper sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        p: 2,
        outline: 'none'
      }}
        elevation={3}>
          <form
            style={{
              display: "flex",
              width: "100%"
            }}
            onSubmit={(event) => {
              event.preventDefault();
              if (username) {
                // do smth with username
              }
            }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              
              <TextField label="username" variant="outlined" onChange={(e) => setUsername(e.target.value)} />
              <IconButton disabled={(username.trim() === "")? true : false} sx={{ p: "4px" }} aria-label="send" type="submit">
                <Login sx={{ color: "ffffffde" }} fontSize="large" />
              </IconButton>
            </Box>
          </form>
      </Paper>
    </Modal>
  );
}

export default GameHubRegistration;