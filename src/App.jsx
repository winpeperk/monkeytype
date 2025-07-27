import { useImmer } from "use-immer"
import TyperContainer from "./TyperContainer"
import TyperChart from "./TyperChart"
import "./index.css"

const App = () => {
  const [errors, setError] = useImmer([])
  const [wpm, setWpm] = useImmer([])
  const [raw, setRaw] = useImmer([])
  const time = 15

  return (
    <div data-theme="light" style={{color: "rgb(var(--text-primary))", background: "rgb(var(--background-primary))"}}>
      <TyperContainer time={time} setError={setError} setWpm={setWpm} setRaw={setRaw}/>
      <div>{errors.join(" ")}</div>
      <div>{wpm.join(" ")}</div>
      <div>{raw.join(" ")}</div>
      <TyperChart time={time} errors={errors} wpm={wpm} raw={raw}/>
    </div>
  )
}

export default App
