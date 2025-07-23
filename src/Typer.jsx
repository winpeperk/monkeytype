import { useEffect } from "react"
import { useImmer } from "use-immer"
import cn from "classnames"

const Letter =  ({letter, userLetter}) => {
    const letterClass = cn({
        "correct-letter": letter && userLetter && letter == userLetter,
        "incorrect-letter": letter && userLetter && letter != userLetter,
        "extra-letter": !letter && userLetter
    })

    const letterValue = letterClass == "extra-letter" ? userLetter : letter

    return <span className={letterClass}>{letterValue}</span>
}

const Word = ({letters, userLetters, status, index}) => {
    const hasMistake = () => {
        let mistake = userLetters.length > letters.length || userLetters.length < letters.length && status == "done"
        if(mistake) return mistake
        for(let i = 0; i < letters.length && i < userLetters.length; i++) {
            if(letters[i] != userLetters[i]) {
                mistake = true
                break
            }
        }
        return mistake
    }

    const wordClass = cn({
        "incorrect-word": status == "done" && hasMistake()
    })

    const wordLetters = () => {
        const result = letters.length >= userLetters.length ? letters : userLetters
        return result.map((_, index) => ({
            letter: letters[index],
            userLetter: userLetters[index]
        }))
    }

    const withSpace = index == 0 ? false : true

    return (
        <>
            {withSpace ? <span> </span> : null}
            <span className={wordClass}>   
                {wordLetters().map(({letter, userLetter}, index) => <Letter key={index} letter={letter} userLetter={userLetter}/>)}
            </span>
        </>
    )
}

const Typer = ({initialText}) => {
    const initialWords = initialText.split(" ").map(word => ({
        letters: word.split(""),
        userLetters: [],
        status: "pending"
    }))

    const [typingState, setTypingState] = useImmer({
        words: initialWords,
        activeWord: 0
    })

    useEffect(() => {
        const handleKeyUp = (e) => {
            switch (e.key) {
                case "Tab": {
                    //запрос к новому тексту
                    break
                }
                case "Backspace" : {
                    setTypingState(prevState => {
                        const {words, activeWord} = prevState
                        const typedLetters = words[activeWord].userLetters
                        if(typedLetters.length == 0) {
                            if(activeWord == 0) return 
                            words[activeWord].status = "pending"
                            words[activeWord - 1].status = "typing"
                            prevState.activeWord--
                        } else {
                            typedLetters.pop()
                        }
                    })
                    break
                }
                case " ": {
                    setTypingState(prevState => {
                        const {words, activeWord} = prevState
                        const typedLetters = words[activeWord].userLetters
                        if(typedLetters.length == 0) return 
                        if(activeWord < words.length - 1) {
                            words[activeWord].status = "done"
                            words[activeWord + 1].status = "typing"
                            prevState.activeWord++
                        }
                    })
                    break
                }
                default: {
                    if(e.key.length != 1) return
                    setTypingState(prevState => {
                        const {words, activeWord} = prevState
                        if(words[activeWord].status == "pending") {
                            words[activeWord].status = "typing"
                        }
                        words[activeWord].userLetters.push(e.key)
                    })
                }
            }
        }
        document.addEventListener("keyup", handleKeyUp)
        return () => document.removeEventListener("keyup", handleKeyUp)
    }, [setTypingState])

    return (
        <>
            <div>
                {typingState.words.map(({letters, userLetters, status}, index) => <Word key={index} letters={letters} userLetters={userLetters} status={status} index={index}/>)}
            </div>
        </>
    )
}

export default Typer