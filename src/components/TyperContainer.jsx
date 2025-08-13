import { useEffect, useRef } from "react";
import Typer from "./Typer";

const TyperContainer = ({ time, setStat, setIsTyped, initialText, divider }) => {
  const error = useRef(0);
  const rawChars = useRef(0);

  const addError = () => {error.current += 1}
  const addRaw = () => {rawChars.current += 1};

  useEffect(() => {
    let elapsedSeconds = 0;
    const calculateCorrectChars = () => {
      const correctWords = document.querySelectorAll(".correct-word");
      let result = Math.max(0, correctWords.length - 1);
      correctWords.forEach(word => {
        result += word.querySelectorAll(".correct").length;
      });
      
      const activeWord = document.querySelector(".active-word");
      result += activeWord.querySelectorAll(".correct").length;
      
      if (correctWords.length > 0) {
        result += 1;
      }
      return result
    }
    const intervalId = setInterval(() => {
      elapsedSeconds++;
      
      const correctChars = calculateCorrectChars()
      
      setStat(prev => {
        const {errors, wpm, raw} = prev
        errors.push(error.current);
        error.current = 0;
        
        wpm.push(Math.round((correctChars / 5) / (elapsedSeconds / 60)));
        
        if(rawChars.current == 0) {
          prev.afk += 1
        }
        raw.push(Math.round(((rawChars.current / 5) / (elapsedSeconds / 60))));
      })
    }, 1000);
    const timeoutId = setTimeout(() => {
      clearInterval(intervalId)
      setStat(prev => {
        prev.correctChars += calculateCorrectChars()
        prev.rawChars += rawChars.current
        prev.correct = document.querySelectorAll(".correct").length
        prev.incorrect = document.querySelectorAll(".incorrect").length
        prev.extra = document.querySelectorAll(".extra").length
        prev.missed = document.querySelectorAll(".missed").length
      })
      setIsTyped("typed")
    }, time * 1000);
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [time, setStat, setIsTyped]);

  return (
      <Typer
        initialText={initialText}
        addError={addError}
        addRaw={addRaw}
        divider={divider}
      />

    );
};

export default TyperContainer;
