import { createContext } from "react";

const ThemeContext = createContext({
    theme: null,
    themes: [],
    setTheme: () => {}
})

export default ThemeContext