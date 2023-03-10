import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

function CommandInput() {
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
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Command to Game"
        inputProps={{ "aria-label": "command to game" }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="default" sx={{ p: "10px" }} aria-label="send">
        <SendIcon htmlColor="#242424"/>
      </IconButton>
    </Paper>
  );
}

export default CommandInput;
