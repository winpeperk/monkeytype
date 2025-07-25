//import { useState } from "react"
import { useImmer } from "use-immer"
import TyperContainer from "./TyperContainer"

const App = () => {
  const [errors, setError] = useImmer([])
  const [wpm, setWpm] = useImmer([])
  const [raw, setRaw] = useImmer([])
  //const [time, setTime] = useState(15)
  const time = 15

  return (
    <>
      <TyperContainer time={time} setError={setError} setWpm={setWpm} setRaw={setRaw}/>
      <div>{errors.join(" ")}</div>
      <div>{wpm.join(" ")}</div>
      <div>{raw.join(" ")}</div>
    </>
  )
}

export default App
