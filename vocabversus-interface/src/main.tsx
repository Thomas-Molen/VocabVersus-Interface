import React from "react";
import ReactDOM from "react-dom/client";
import Title from "./components/Title";
import CommandInput from "./components/CommandInput";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import "./main.css";
// Roboto font used by Material UI
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
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
  </React.StrictMode>
);
