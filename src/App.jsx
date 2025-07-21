import { useState } from "react"
import Typer from "./Typer.jsx"

const App = () => {
  const [mistakes, setMistakes] = useState(0)
  const addMistake = () => setMistakes(prevMistakes => prevMistakes++)
  
  return (
    <>
      <Typer mistakes={mistakes} addMistake={addMistake} initialText={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere voluptatibus, voluptatum alias sint eum earum unde, ad neque quo in perspiciatis voluptas beatae ipsam voluptatem, iste quisquam voluptates. Recusandae, adipisci."}/>
    </>
  )
}

export default App
