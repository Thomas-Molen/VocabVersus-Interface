import { useContext, useEffect } from "react";
import "./FeedbackMessage.css";
import { EventHandlerContext } from "../GameHub/GameHubContext";

function FeedbackMessage() {
  const eventHandler = useContext(EventHandlerContext);

  useEffect(() => {
    // update feedback state when display event updates
    eventHandler.On<boolean>(
      "display-evaluate-feedback",
      (isSuccess: boolean) => {
        // animate feedback message element to notify the user visually
        let feedbackMessage = document.getElementById((isSuccess ? "correct" : "incorrect") + "-feedback-message");
        if (feedbackMessage) {
          const animationClassName: string = isSuccess ? "animate-correct-fade" : "animate-incorrect-shake";
          feedbackMessage.classList.remove(animationClassName);
          // request browser reflow
          feedbackMessage.offsetWidth;
          feedbackMessage.classList.add(animationClassName);
        }
      },
      "feedback-message-display-update"
    );
  }, []);

  return (
    <div className="feedback-message">
      <span
        id="correct-feedback-message"
        className="feedback-text correct-feedback-text"
      >
        ✓
      </span>
      <span
        id="incorrect-feedback-message"
        className="feedback-text incorrect-feedback-text"
      >
        X
      </span>
    </div>
  );
}

export default FeedbackMessage;
