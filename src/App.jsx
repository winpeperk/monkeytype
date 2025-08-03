import { useImmer } from "use-immer";
import TyperContainer from "./components/TyperContainer";
import StatGrid from "./components/StatGrid";
import { useEffect, useState } from "react";
import ResizeContext from "./components/ResizeContext"

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
      <TyperContainer
        time={time}
        setStat={setStat}
      />
      {/* <div>{stat.errors.join(" ")}</div>
      
      <div> incorrect {stat.incorrect}</div>
      <div>correct {stat.correct}</div>
      <div>extra {stat.extra}</div>
      <div>missed {stat.missed}</div>
      <div>afk {stat.afk}</div> */}
      <StatGrid stat={stat} time={time} width={width}/>
    </ResizeContext.Provider>
  );
};

export default App;
