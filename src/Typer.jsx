import { useContext, useEffect } from "react"
import { useImmer } from "use-immer"
import TyperContext from "./TyperContext"
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
        status: "inProgress"
    }))

    const [typingState, setTypingState] = useImmer({
        words: initialWords,
        activeWord: 0
    })

    const {addIncorrectChars, addCorrectChars, addRawChars} = useContext(TyperContext)

    useEffect(() => {
        const checkLetter = ({letters, userLetters}) => {
            const index = userLetters.length - 1
            if (letters[index] == userLetters[index]) {
                addCorrectChars()
            } else {
                addIncorrectChars()
            }
        }
        const checkWord = ({letters, userLetters}) => {
            if(userLetters.length < letters.length) {
                addIncorrectChars()
            }
        }
        const handleKeyDown = (e) => {
            setTypingState(prev => {
                const {words, activeWord} = prev
                const typedLetters = words[activeWord].userLetters
                switch (e.key) {
                    case "Tab": {
                        //запрос к новому тексту
                        break;
                    }
                    case "Backspace" : {                            
                        if(typedLetters.length == 0) {
                            if(activeWord == 0) return 
                            words[activeWord - 1].status = "inProgress"
                            prev.activeWord--
                        } else {
                            typedLetters.pop()
                        }
                        break;
                    }
                    case " ": {
                        if(typedLetters.length == 0) {
                            addIncorrectChars()
                        } else if(activeWord < words.length - 1) {
                            checkWord(words[activeWord])
                            words[activeWord].status = "done"
                            prev.activeWord++
                        }
                        break
                    }
                    default: {
                        if(e.key.length != 1) break
                        words[activeWord].userLetters.push(e.key)
                        checkLetter(words[activeWord])
                        break
                    }
                }
            })
            if(e.key == "Backspace" || e.key.length == 1) {
                addRawChars()
            }
        }
        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [addCorrectChars, addIncorrectChars, addRawChars, setTypingState])

    return (
        <>
            <div>
                {typingState.words.map(({letters, userLetters, status}, index) => <Word key={index} letters={letters} userLetters={userLetters} status={status} index={index}/>)}
            </div>
        </>
    )
}

export default Typer