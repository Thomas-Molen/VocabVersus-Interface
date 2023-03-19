import React from "react";
import ReactDOM from "react-dom/client";
import GameHubConnection from "./components/GameHubConnection";
import GameInterface from "./components/GameInterface";
import "./main.css";
// Roboto font used by Material UI
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <GameHubConnection>
    <GameInterface />
  </GameHubConnection>
);
