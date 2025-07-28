import ThemeContext from "./ThemeContext.jsx"
import { useContext, useEffect, useState } from "react"

const Button = () => {
    const {setTheme} = useContext(ThemeContext)
    
    const handleSwitchTheme = () => {
        setTheme(prev => prev == "light" ? "dark" : "light")
    }

    return <button onClick={handleSwitchTheme}>Switch Theme</button>
}

const storageKey = "theme"

const themes = ["light", "dark"]

const getInitTheme = () => {
    let initTheme = localStorage.getItem(storageKey)
    if(!initTheme) {
        localStorage.setItem(storageKey, "light")
        initTheme = "light"
    }
    return initTheme
}

const Theme = ({children}) => {
    const [theme, setTheme] = useState(getInitTheme)

    useEffect(() => { 
        const handleStorage = (event) => {
            if(event.key != storageKey) return
            const newTheme = localStorage.getItem(storageKey)
            if(newTheme) {
                setTheme(newTheme)
                document.documentElement.setAttribute("data-theme", newTheme)
            }
        }
        document.addEventListener("storage", handleStorage)
        return () => {
            document.removeEventListener("storage", handleStorage)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(storageKey, theme)
        document.documentElement.setAttribute("data-theme", theme)
    }, [theme])

    return (
        <ThemeContext.Provider value={{theme, themes, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

Theme.Button = Button

export default Theme
