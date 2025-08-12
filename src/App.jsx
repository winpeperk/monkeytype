import { useImmer } from "use-immer";
import TyperContainer from "./components/TyperContainer";
import StatGrid from "./components/StatGrid";
import { useEffect, useState } from "react";
import ResizeContext from "./components/ResizeContext";
import Header from "./components/Header";
import TestConfig from "./components/TestConfig";

const initStat = {
  incorrect: 0,
  correct: 0,
  extra: 0,
  missed: 0,
  errors: [],
  correctChars: 0,
  rawChars: 0,
  wpm: [],
  raw: [],
  afk: 0
}

const App = () => {
  const [stat, setStat] = useImmer(initStat);
  const [isTyped, setIsTyped] = useState("typing");
  const [time, setTime] = useState(15)
  const [width, setWidth] = useState(window.innerWidth)
  const [text, setText] = useState("Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere voluptatibus, voluptatum alias sint eum earum unde, ad neque quo in perspiciatis voluptas beatae ipsam voluptatem, iste quisquam voluptates. Recusandae, adipisci.")

  useEffect(() => {
    const handleWidth = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleWidth)
    return () => {
      window.removeEventListener("resize", handleWidth)
    }
  }, [])

  useEffect(() => {
    setStat(initStat)
    setText("gpsum dolor sit, amet consectetur adipisicing elit. Facere voluptatibus, voluptatum alias sint eum earum unde, ad neque quo in perspiciatis voluptas beatae ipsam voluptatem, iste quisquam voluptates. Recusandae, adipisci.")
  }, [time, setStat])

  return (
    <ResizeContext.Provider value={{ width }}>
      <Header/>
      {isTyped == "typing" ? (
        <>
          <TestConfig time={time} setTime={setTime}/>
          <TyperContainer
            time={time}
            setStat={setStat}
            setIsTyped={setIsTyped}
            initialText={text}
          />
        </>
      ) : (
        <StatGrid stat={stat} time={time} width={width}/>
      )}
    </ResizeContext.Provider>
  );
};

export default App;
