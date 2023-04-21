import ReactDOM from "react-dom/client";
import GameHubConnection from "./components/GameHub/GameHubConnection";
import GameInterface from "./components/GamePlay/GameInterface";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./main.css";
// Roboto font used by Material UI
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import NotFound from "./components/NotFound";
import PreLoader from "./components/PreLoader";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CountDown from "./components/GamePlay/CountDown";
import { Helmet } from "react-helmet";

// set custom theming overrides
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xsm: true;
  }
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  breakpoints: {
    values: {
      xs: 0,
      xsm: 300,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    }
  }
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider theme={darkTheme}>
    <PreLoader>
      <Router>
        <Routes>
          <Route path="/test" element={
            <>
              <h1>TEST</h1>
              <NotFound />
            </>
          } />
          <Route
            path="/:gameid"
            element={
              <>
                <Helmet>
                  <meta content="You have been challenged ⚔️" property="og:description" />
                </Helmet>
                <CountDown timeMargin={1.5} simulatedSecond={1150}>
                  <GameHubConnection>
                    <GameInterface />
                  </GameHubConnection>
                </CountDown>
              </>
            }
          />
          <Route path="*" element={
            <>
              <Helmet>
                <meta content="Online word party game, compete with friends, show who's the best!" property="og:description" />
              </Helmet>
              <NotFound />
            </>
          } />
        </Routes>
      </Router>
    </PreLoader>
  </ThemeProvider>
);
