import { useEffect } from "react";
import { useImmer } from "use-immer";
import cn from "classnames";
import { Divider, useTheme } from "@chakra-ui/react";

const CustomDivider = () => {
  const theme = useTheme()

  return (
  <Divider
    as="span"
    orientation="vertical"
    borderWidth={3}
    borderRadius={6}
    height="30px"
    borderColor={theme.colors.logo_second}
    opacity={1}
    sx={{
      animation: "blink 0.7s infinite",
      "@keyframes blink": {
        "0%, 100%": {opacity: 1},
        "50%": {opacity: 0.1}
      }
    }}
  />
)}

const Letter = ({ letter, userLetter, status }) => {
  const letterClass = cn({
    "correct": letter && userLetter && letter === userLetter,
    "incorrect": letter && userLetter && letter !== userLetter,
    "extra": !letter && userLetter,
    "missed": !userLetter && letter && status === "done"
  });

  const letterValue = letterClass.includes("extra") ? userLetter : letter;

  return <span className={letterClass}>{letterValue}</span>;
};

const Word = ({ letters, userLetters, status, active, index, divider }) => {
  const hasMistake = () => {
    let mistake = userLetters.length !== letters.length;
    if (mistake) return mistake;
    for (let i = 0; i < letters.length; i++) {
      if (letters[i] !== userLetters[i]) {
        mistake = true;
        break;
      }
    }
    return mistake;
  };

  const withMistake = hasMistake()

  const wordClass = cn({
    "incorrect-word": status === "done" && withMistake,
    "correct-word": status === "done" && !withMistake,
    "active-word": active === index
  });

  const wordLetters = () => {
    const maxLength = Math.max(letters.length, userLetters.length);
    return Array.from({ length: maxLength }, (_, index) => ({
      letter: letters[index],
      userLetter: userLetters[index],
    }));
  };

  const withSpace = index === 0 ? false : true;

  return (
    <>
      {withSpace ? <span> </span> : null}
      <span className={wordClass}>
        {wordLetters().map(({ letter, userLetter }, index) => (
          <>
          {(divider && wordClass === "active-word" && userLetters.length === 0 && index === 0) ? <CustomDivider/> : null}
          <Letter key={index} letter={letter} userLetter={userLetter} status={status}/>
          {(divider && wordClass === "active-word" && index === userLetters.length - 1) ? <CustomDivider/> : null}
          </>
        ))}
      </span>
    </>
  );
};

const Typer = ({ initialText, addError, addRaw, divider }) => {
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
      if (letters[index] !== userLetters[index]) {
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
            if (typedLetters.length === 0) {
              if (activeWord === 0) return;
              words[activeWord - 1].status = "inProgress";
              prev.activeWord--;
            } else {
              typedLetters.pop();
            }
            addRaw();
            break;
          }
          case " ": {
            if (typedLetters.length === 0) {
              addError()
            } else if (activeWord < words.length - 1) {
              checkExtraSpace(active)
              active.status = "done";
              prev.activeWord++;
            }
            addRaw()
            break;
          }
          default: {
            if (e.key.length !== 1) break;
            active.userLetters.push(e.key);
            checkIncorrectLetter(active)
            addRaw()
            break;
          }
        }
      });
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [ addError, addRaw, setTypingState]);

  return (
    <>
      <div style={{lineHeight: "250%", fontSize: "25px"}}>
        {typingState.words.map(({ letters, userLetters, status }, index) => (
          <Word
            key={index}
            letters={letters}
            userLetters={userLetters}
            status={status}
            active={typingState.activeWord}
            index={index}
            divider={divider}
          />
        ))}
      </div>
    </>
  );
};

export default Typer;
