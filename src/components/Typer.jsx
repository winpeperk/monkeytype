import { useEffect } from "react";
import { useImmer } from "use-immer";
import cn from "classnames";

const Letter = ({ letter, userLetter, status }) => {
  const letterClass = cn({
    "correct": letter && userLetter && letter == userLetter,
    "incorrect": letter && userLetter && letter != userLetter,
    "extra": !letter && userLetter,
    "missed": !userLetter && letter && status == "done"
  });

  const letterValue = letterClass.includes("extra") ? userLetter : letter;

  return <span className={letterClass}>{letterValue}</span>;
};

const Word = ({ letters, userLetters, status, index }) => {
  const hasMistake = () => {
    let mistake =
      userLetters.length > letters.length ||
      (userLetters.length < letters.length && status == "done");
    if (mistake) return mistake;
    for (let i = 0; i < letters.length && i < userLetters.length; i++) {
      if (letters[i] != userLetters[i]) {
        mistake = true;
        break;
      }
    }
    return mistake;
  };

  const wordClass = cn({
    "incorrect-word": status == "done" && hasMistake(),
  });

  const wordLetters = () => {
    const maxLength = Math.max(letters.length, userLetters.length);
    return Array.from({ length: maxLength }, (_, index) => ({
      letter: letters[index],
      userLetter: userLetters[index],
    }));
  };

  const withSpace = index == 0 ? false : true;

  return (
    <>
      {withSpace ? <span> </span> : null}
      <span className={wordClass}>
        {wordLetters().map(({ letter, userLetter }, index) => (
          <Letter key={index} letter={letter} userLetter={userLetter} status={status}/>
        ))}
      </span>
    </>
  );
};

const Typer = ({ initialText, addError, addRaw }) => {
  const initialWords = initialText.split(" ").map((word) => ({
    letters: word.split(""),
    userLetters: [],
    status: "inProgress",
  }));

  const [typingState, setTypingState] = useImmer({
    words: initialWords,
    activeWord: 0,
  });

  useEffect(() => {
    const checkIncorrectLetter = ({letters, userLetters}) => {
      const index = userLetters.length - 1
      // Если индекс выходит за пределы длины letters, это лишняя буква
      if (index >= letters.length) {
        // Лишние буквы не считаются ошибками, они отображаются как "extra"
        return
      }
      // Если буквы не совпадают, это ошибка
      if (letters[index] != userLetters[index]) {
        addError()
      }
    }
    const checkExtraSpace = ({letters, userLetters}) => {
      if(userLetters.length < letters.length) {
          addError()
      }
    }
    const handleKeyDown = (e) => {
      setTypingState((prev) => {
        const { words, activeWord } = prev;
        const active = words[activeWord]
        const typedLetters = active.userLetters;
        switch (e.key) {
          case "Tab": {
            //запрос к новому тексту
            break;
          }
          case "Backspace": {
            if (typedLetters.length == 0) {
              if (activeWord == 0) return;
              words[activeWord - 1].status = "inProgress";
              prev.activeWord--;
            } else {
              typedLetters.pop();
            }
            break;
          }
          case " ": {
            if (typedLetters.length == 0) {
              addError()
            } else if (activeWord < words.length - 1) {
              checkExtraSpace(active)
              active.status = "done";
              prev.activeWord++;
            }
            break;
          }
          default: {
            if (e.key.length != 1) break;
            active.userLetters.push(e.key);
            checkIncorrectLetter(active)
            break;
          }
        }
      });
      if(e.key != "Shift") {
        addRaw();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [ addError, addRaw, setTypingState]);

  return (
    <>
      <div>
        {typingState.words.map(({ letters, userLetters, status }, index) => (
          <Word
            key={index}
            letters={letters}
            userLetters={userLetters}
            status={status}
            index={index}
          />
        ))}
      </div>
    </>
  );
};

export default Typer;
