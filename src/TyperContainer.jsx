import { useEffect, useRef } from "react"
import TyperContext from "./TyperContext"
import Typer from "./Typer"

const TyperContainer = ({time, setError, setWpm, setRaw}) => {
    const incorrectChars = useRef(0)
    const correctChars = useRef(0)
    const rawChars = useRef(0)

    const addIncorrectChars = () => incorrectChars.current += 1
    const addCorrectChars = () => correctChars.current += 1
    const addRawChars = () => rawChars.current += 1
    const addFunctions = {addIncorrectChars, addCorrectChars, addRawChars}

    useEffect(() => {
        let elapsedSeconds = 0
        const intervalId = setInterval(() => {
            elapsedSeconds++
            setError(errors => {
                errors.push(incorrectChars.current)
                incorrectChars.current = 0
            })
            setWpm(wpm => {wpm.push(Math.round((correctChars.current / 5) / (elapsedSeconds / 60)))})
            setRaw(raw => {
                raw.push(Math.round((rawChars.current / 5) * 60))
                rawChars.current = 0
            })
        }, 1000)
        const timeoutId = setTimeout(() => clearInterval(intervalId), time * 1000)
        return () => {
            clearInterval(intervalId)
            clearTimeout(timeoutId)
        }
    }, [time, setError, setWpm, setRaw])
    
    return (
        <TyperContext.Provider value={addFunctions}>
            <Typer initialText={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere voluptatibus, voluptatum alias sint eum earum unde, ad neque quo in perspiciatis voluptas beatae ipsam voluptatem, iste quisquam voluptates. Recusandae, adipisci."}/>
        </TyperContext.Provider>
    )
}

export default TyperContainer