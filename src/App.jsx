import { useImmer } from "use-immer";
import TyperContainer from "./components/TyperContainer";
import StatGrid from "./components/StatGrid";
import { useEffect, useState } from "react";
import ResizeContext from "./components/ResizeContext";
import Header from "./components/Header";

const App = () => {
  const [stat, setStat] = useImmer({
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
  });
  const [isTyped, setIsTyped] = useState("typing");
  const time = 15;
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleWidth = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleWidth)
    return () => {
      window.removeEventListener("resize", handleWidth)
    }
  }, [])

  return (
    <ResizeContext.Provider value={{ width }}>
      <Header/>
      {isTyped == "typing" ? (
        <TyperContainer
          time={time}
          setStat={setStat}
          setIsTyped={setIsTyped}
        />
      ) : (
        <StatGrid stat={stat} time={time} width={width}/>
      )}
    </ResizeContext.Provider>
  );
};

export default App;
