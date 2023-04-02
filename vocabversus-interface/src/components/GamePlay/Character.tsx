import { useEffect } from "react";
import "./Character.css"

type CharacterProps = {
  character: string;
  wordToCompare?: string;
};

function Character({ character, wordToCompare = "" }: CharacterProps) {
  function GetFeedbackClass() {
    if (wordToCompare)
    {
      return wordToCompare.toLowerCase().includes(character.toLowerCase()) ? "character-success" : "character-warning";
    }
    return "";
  }

  return (
    <div className={`character-box ${GetFeedbackClass()}`}>
      <span className="character-text">{character}</span>
    </div>
  );
}



export default Character;
