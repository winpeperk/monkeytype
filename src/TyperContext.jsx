import { createContext } from "react"

const TyperContext = createContext({
    addIncorrectChars: () => {}, 
    addCorrectChars: () => {}, 
    addRawChars: () => {}
})

export default TyperContext