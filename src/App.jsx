import { useState } from "react";
import { useImmer } from "use-immer";
import TyperContainer from "./components/TyperContainer";
import Chart from "./components/Chart";

const App = () => {
  const [stat, setStat] = useImmer({
    incorrect: 0,
    correct: 0,
    extra: 0,
    missed: 0
  });
  const [errors, setError] = useImmer([]);
  const [wpm, setWpm] = useImmer([]);
  const [raw, setRaw] = useImmer([]);
  const [afk, setAfk] = useState(0)
  const time = 15;

/*   const average = (array) => {
    if(array.length == 0) return 0
    return array.reduce((sum, currentWpm) => sum + currentWpm, 0) / array.length
  } */

  return (
    <>
      <TyperContainer
        time={time}
        setError={setError}
        setWpm={setWpm}
        setRaw={setRaw}
        setStat={setStat}
        setAfk={setAfk}
      />
      <div>{errors.join(" ")}</div>
      <div>{wpm.join(" ")}</div>
      <div>{raw.join(" ")}</div>
      <div> incorrect {stat.incorrect}</div>
      <div>correct {stat.correct}</div>
      <div>extra {stat.extra}</div>
      <div>missed {stat.missed}</div>
      <div>afk {afk}</div>
      <Chart time={time} errors={errors} wpm={wpm} raw={raw} />
    </>
  );
};

export default App;
