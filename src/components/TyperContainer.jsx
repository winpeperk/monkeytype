import { useEffect, useRef } from "react";
import Typer from "./Typer";

const TyperContainer = ({ time, setError, setWpm, setRaw, setStat, setAfk }) => {
  const error = useRef(0);
  const rawChars = useRef(0);

  const addError = () => {error.current += 1}
  const addRaw = () => {rawChars.current += 1};

  useEffect(() => {
    let elapsedSeconds = 0;
    const intervalId = setInterval(() => {
      elapsedSeconds++;
      let correct = document.querySelectorAll(".correct").length
      setError((errors) => {
        errors.push(error.current);
        error.current = 0;
      });
      setWpm((wpm) => {
        wpm.push(Math.round(correct / 5 / (elapsedSeconds / 60)));
      });
      if(rawChars.current == 0) {
        setAfk((afk) => afk + 1)
      }
      setRaw((raw) => {
        raw.push(Math.round((rawChars.current / 5) * 60));
        rawChars.current = 0;
      });
    }, 1000);
    const timeoutId = setTimeout(() => {
      clearInterval(intervalId)
      setStat(prev => {
        prev.correct = document.querySelectorAll(".correct").length
        prev.incorrect = document.querySelectorAll(".incorrect").length
        prev.extra = document.querySelectorAll(".extra").length
        prev.missed = document.querySelectorAll(".missed").length
      })
    }, time * 1000);
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [time, setError, setWpm, setRaw, setStat, setAfk]);

  return (
      <Typer
        initialText={
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere voluptatibus, voluptatum alias sint eum earum unde, ad neque quo in perspiciatis voluptas beatae ipsam voluptatem, iste quisquam voluptates. Recusandae, adipisci."
        }
        addError={addError}
        addRaw={addRaw}
      />

    );
};

export default TyperContainer;
