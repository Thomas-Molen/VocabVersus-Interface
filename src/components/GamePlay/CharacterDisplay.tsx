import { useEffect, useState } from "react";
import "./CharacterDisplay.css";
import { useScrollTrigger } from "@mui/material";

type CharacterProps = {
  characters: string[];
  wordToCompare?: string;
};

function CharacterDisplay({ characters, wordToCompare = "" }: CharacterProps) {
  const [cssMap, setCssMap] = useState<{ [charIndex: number]: string; }>({});

  useEffect(() => {
    // Create a dictionary of css classNames for every character to apply on character renders
    let wordCharMap = wordToCompare.toLowerCase().split('');
    if (wordToCompare) {
      characters.map((char, i) => {
        // Check if word contains character
        const charIndex = wordCharMap.findIndex(c => c === char);
        setCssMap(prevMap => ({...prevMap, [i]: (charIndex === -1) ? "character-warning" : "character-success"}));
        // If word had character, remove character from word to allow for correct duplicate character highlighting
        if (charIndex >= 0) wordCharMap.splice(charIndex, 1);
      })
    }
    else
    {
      setCssMap({});
    }
  }, [characters, wordToCompare])

  return (
    <>
      {characters.map((char, i) => {
        return (
          <div key={i} className={`character-box ${cssMap[i] ?? ""}`}>
            <span className="character-text">{char.toUpperCase()}</span>
          </div>
        );
      })}
    </>
  );
}

export default CharacterDisplay;
