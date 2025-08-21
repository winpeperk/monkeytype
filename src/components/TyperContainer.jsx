import { useEffect, useRef } from "react";
import Typer from "./Typer";

const TyperContainer = ({ settings, setSettings, setStat, setTestState, testState, initialText, divider }) => {
  const {mode, options, extraMode, language} = settings

  // включая удалённые
  const correct = useRef(0) // правильные буквы
  const error = useRef(0); // неправильные буквы + пробелы
  const rawChars = useRef(0); // все символы

  const addCorrect = () => {correct.current += 1}
  const addError = () => {error.current += 1}
  const addRaw = () => {rawChars.current += 1};

  useEffect(() => {
     const calculateCorrectCharsInCorrectWords = () => {
      const correctWords = document.querySelectorAll(".correct-word");
      let result = Math.max(0, correctWords.length);
      correctWords.forEach(word => {
        result += word.querySelectorAll(".correct").length;
      });
      
      const activeWord = document.querySelector(".active-word");
      result += activeWord.querySelectorAll(".correct").length;
      
      return result
    }

    const calculateResults = () => {
      setStat(prev => {
        prev.correctChars = correct.current
        prev.rawChars += rawChars.current
        prev.correct = document.querySelectorAll(".correct").length
        prev.incorrect = document.querySelectorAll(".incorrect").length
        prev.extra = document.querySelectorAll(".extra").length
        prev.missed = document.querySelectorAll(".missed").length
      })
      setTestState("finished")
    }

    let intervalId = null
    let timeoutId = null
    
    if(testState == "running") {
      intervalId = setInterval(() => {
        setSettings(prev => {
          prev.elapsedTime += 1
          const currentElapsedTime = prev.elapsedTime

          const correctChars = calculateCorrectCharsInCorrectWords()
        
          setStat(prev => {
            const {errors, wpm, raw} = prev
            errors.push(error.current);
            error.current = 0;
            
            wpm.push(Math.round((correctChars / 5) / (currentElapsedTime / 60)));
            
            if(rawChars.current == 0) {
              prev.afk += 1
            }
            raw.push(Math.round(((rawChars.current / 5) / (currentElapsedTime / 60))));
          })
        })
      }, 1000);

      if(mode == "time") {
        timeoutId = setTimeout(() => {
          clearInterval(intervalId)
          calculateResults()
        }, options[mode] * 1000);
      }
    }

    if(testState == "calculating") {
      if(mode == "time") {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      }
      calculateResults()
    }

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [mode, options, extraMode, language, testState, setTestState, setSettings, setStat]);

  return (
      <Typer
        initialText={initialText}
        addCorrect={addCorrect}
        addError={addError}
        addRaw={addRaw}
        divider={divider}
        setTestState={setTestState}
      />
    )
};

export default TyperContainer;
