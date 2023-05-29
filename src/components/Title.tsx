import "./Title.css";
import { useEffect } from "react";

function Title() {
  useEffect(() => {
    // Randomize titel letters on hover
    const letters = "ABCELMORSTUVWabcelmorstuvw";
    const title = document.getElementById("title");
    if (title != null) {
      title.onmouseover = (event) => {
        const target = event.target as HTMLHeadingElement;
        // limit the random letter switch to only occur when default text is visible
        if (target.innerText === target.dataset.value) {
          let iteration = 0;

          const titelRandomizer = setInterval(() => {
            // Get a random letter for every letter in the title
            target.innerText = target.innerText
              .split("")
              .map((letter, index) => {
                // skip whitespaces and make the random letters flow throughout the word
                if (letter.trim().length !== 0 && index >= iteration) {
                  return letters[Math.floor(Math.random() * letters.length)];
                }
                return target.dataset.value?.[index] ?? "";
              })
              .join("");

            // if all letters have been iterated, stop the text randomizer interval
            if (iteration >= (target.dataset.value?.length ?? 0))
              clearInterval(titelRandomizer);
            iteration += 1 / 2;
          }, 30);
        }
      };
    }
  });

  return (
    <>
      <h1 data-value="Welcome to VocabVersus" id="title">Welcome to VocabVersus</h1>
    </>
  );
}

export default Title;
