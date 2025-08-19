import { useEffect, useState } from "react";
import { extendTheme } from "@chakra-ui/react";
import { ChakraProvider, Button } from "@chakra-ui/react";

const storageKey = "chakra-ui-color-mode"

const globalStyles = {
  global: ({theme}) => ({
    "*": {
      m: 0,
      p: 0,
      boxSizing: "border-box",
      lineHeight: 1,
      "::selection": {
        bg: theme.colors.text_secondary,
        color: theme.colors.bg,
      }
    },
    body: {
      bg: theme.colors.bg,
      color: theme.colors.text_primary,
      fontFamily: "Roboto Mono",
    },
    ".correct": {
      color: theme.colors.text_secondary
    },
    ".incorrect": {
      color: theme.colors.errors
    },
    ".extra": {
      color: theme.colors.extra
    },
    ".incorrect-word": {
      textDecoration: "underline",
      textDecorationColor: theme.colors.errors
    }
  })
}

const lightTheme = extendTheme({
  colors: {
    bg: "rgb(255, 251, 254)",
    keypad_bg: "rgb(239, 224, 241)",
    text_primary: "rgb(225, 164, 200)",
    opacity_text_primary: "rgba(225, 164, 200, 0.6)",
    text_secondary: "rgb(185, 65, 137)",
    extra: "rgb(151, 121, 227)",
    errors: "rgb(92, 41, 84)",
    tooltip_bg: "rgb(32, 33, 36)",
    logo_first: "rgb(92, 41, 84)",
    logo_second: "rgb(92, 41, 84)",
    focus: "rgb(92, 41, 84)",
    area_raw: "rgba(32, 33, 36, 0.1)",
    area_wpm: "rgba(32, 33, 36, 0.3)",
    opacity_tooltip_bg: "rgba(32, 33, 36, 0.9)"
  },
  styles: globalStyles
})

const darkTheme = extendTheme({
  colors: {
    bg: "rgb(14, 14, 14)",
    keypad_bg: "rgb(32, 33, 36)",
    text_primary: "rgb(124, 126, 127)",
    text_secondary: "rgb(255, 153, 0)",
    extra: "rgb(192, 14, 19)",
    errors: "rgb(192, 14, 19)",
    tooltip_bg: "rgb(198, 198, 198)",
    logo_first: "rgb(198, 198, 198)",
    logo_second: "rgb(255, 153, 0)",
    focus: "rgb(198, 198, 198)",
    area_raw: "rgba(198, 198, 198, 0.1)",
    area_wpm: "rgba(198, 198, 198, 0.3)",
    opacity_tooltip_bg: "rgba(198, 198, 198, 0.9)"
  },
  styles: globalStyles
})

const themes = [lightTheme, darkTheme];

const themesNames = ["light", "dark"];

const Theme = ({ children }) => {
  const [themeIndex, setThemeIndex] = useState(0);

  useEffect(() => {
    let theme = localStorage.getItem(storageKey)
    if(theme != null) {
      const index = themesNames.findIndex(curTheme => curTheme == theme)
      setThemeIndex(index)
    }

    const handleStorage = (event) => {
      if (event.key !== storageKey) return;
      const newTheme = localStorage.getItem(storageKey);
      const index = themesNames.findIndex(theme => theme == newTheme)
      setThemeIndex(index);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleTheme = () => {
    const newIndex = (themeIndex + 1) % themes.length
    setThemeIndex(newIndex)
    localStorage.setItem(storageKey, themesNames[newIndex])
  }

  return (
    <ChakraProvider resetCSS theme={themes[themeIndex]}>
      {children}
      <Button onClick={handleTheme} color="black">Switch Theme</Button>
    </ChakraProvider>
  );
};

export default Theme;
