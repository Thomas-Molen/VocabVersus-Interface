import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import GameHubConnection from "./components/GameHubConnection";
import GameInterface from "./components/GameInterface";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./main.css";
// Roboto font used by Material UI
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import NotFound from "./components/NotFound";
import PreLoader from "./components/PreLoader";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider theme={darkTheme}>
    <PreLoader>
      <Router>
        <Routes>
          <Route path="/:gameid" element={
            <GameHubConnection>
              <GameInterface />
            </GameHubConnection>} />
          <Route path="*" element={
            <NotFound />
          } />
        </Routes>
      </Router>
    </PreLoader>
  </ThemeProvider>
);
