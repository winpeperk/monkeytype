import { useEffect, useState, useCallback } from "react"
import { useImmer } from "use-immer"

const Typer = ({addMistake, initialText}) => {
    const [user, setUser] = useImmer({text: [], activeIndex: null})
    const [mistakeIndexes, setMistake] = useState([])
    const [warning, setWarning] = useImmer({text: [], startIndex: null})

    const handleKeyUp = useCallback((e) => {
        switch (e.key) {
            case "Tab": {
                //запрос к новому тексту
                break
            }
            case "Backspace" : {
                setUser(prevUser => {
                    if(prevUser.text.length == 1) {
                        prevUser.activeIndex = null
                    } else {
                        prevUser.activeIndex--
                    }
                    if(prevUser.text.length != 0) {
                        prevUser.text.pop()
                    }
                })
                break
            }
            default: {
                setUser(prevUser => {
                    if(prevUser.text.length == 0) {
                        prevUser.activeIndex = 0
                    } else {
                        prevUser.activeIndex++
                    }
                    prevUser.text.push(e.key)
                })
            }
        }
    }, [setUser])

    useEffect(() => {
        document.addEventListener("keyup", handleKeyUp)
        return () => document.removeEventListener("keyup", handleKeyUp)
    }, [handleKeyUp])

    useEffect(() => {
        const {activeIndex} = user
        if(activeIndex == null) return
        //если пользователь удалил символ
        if(warning.text.length != 0 && warning.text[warning.text.length - 1] != user.text[activeIndex]) {
            setWarning(prevWarning => {
                if(prevWarning.text.length == 1) {
                    prevWarning.startIndex = null
                }
                prevWarning.text.pop()
            })
            return
        }
        if(mistakeIndexes.length != 0 && mistakeIndexes[mistakeIndexes.length - 1] > activeIndex) {
            setMistake(prevMistakeIndexes => {
                prevMistakeIndexes.pop()
            })
            return
        }
        //если пользователь написал новый символ и буквы не совпали
        if (user.text[activeIndex] != initialText[activeIndex]) {
            if(initialText[activeIndex] == " " || warning.text.length != 0) {
                setWarning(prevWarning => {
                    if(prevWarning.text.length == 0) {
                        prevWarning.startIndex = activeIndex
                    }
                    prevWarning.text.push(user.text[activeIndex])
                })
            } else {
                setMistake(prevMistakeIndexes => {
                    prevMistakeIndexes.push(activeIndex)
                })
            }
            addMistake()
        }
    }, [user])


    return (
        <>
            <div>
                {initialText.split("").map((letter, index) => {
                    if (mistakeIndexes.includes(index)) {
                        return <span key={index} className="mistake-letter">{letter}</span>
                    } else if (warning.startIndex == index) {
                        return (
                        <React.Fragment key={index}>
                            <span className="warning-letter">{warning.text.join("")}</span>
                            {letter}
                        </React.Fragment>
                        )
                    }
                    return (
                        <React.Fragment key={index}>
                            {letter}
                        </React.Fragment>
                    )
                })}
            </div>
        </>
    )
}

export default Typer