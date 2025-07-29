import { useImmer } from "use-immer"
import TyperContainer from "./components/TyperContainer"
import Chart from "./components/Chart"

const App = () => {
  const [errors, setError] = useImmer([])
  const [wpm, setWpm] = useImmer([])
  const [raw, setRaw] = useImmer([])
  const time = 15

  return (
    <>
      <TyperContainer time={time} setError={setError} setWpm={setWpm} setRaw={setRaw}/>
      <div>{errors.join(" ")}</div>
      <div>{wpm.join(" ")}</div>
      <div>{raw.join(" ")}</div>
      <Chart time={time} errors={errors} wpm={wpm} raw={raw}/>
    </>
  )
}

export default App
