import { useEffect } from "react";
import { GameHubEventHandler } from "../../utility/GameHubEventsHandler";

type GameHubProps = {
  children: React.ReactNode;
  eventHandler: GameHubEventHandler;
};

function GameHubConnectionCallbackInterface({
  children,
  eventHandler,
}: GameHubProps) {
  useEffect(() => {
    eventHandler.On<string>(
      "test",
      (test: string) => {
        console.log(test);
      },
      "test1"
    );
  }, []);
  return <>{children}</>;
}

export default GameHubConnectionCallbackInterface;
