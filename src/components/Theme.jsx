import ThemeContext from "./ThemeContext.jsx";
import { useContext, useEffect, useState } from "react";

const Button = () => {
  const { setTheme } = useContext(ThemeContext);

  const handleSwitchTheme = () => {
    setTheme((prev) => (prev == "light" ? "dark" : "light"));
  };

  return <button onClick={handleSwitchTheme}>Switch Theme</button>;
};

const storageKey = "theme";

const themes = ["light", "dark"];

const Theme = ({ children }) => {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    let initTheme = localStorage.getItem(storageKey);
    if (initTheme == null) {
      initTheme = "light";
      localStorage.setItem(storageKey, initTheme);
    }
    setTheme(initTheme);
    document.documentElement.setAttribute("data-theme", initTheme);
  }, []);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key != storageKey) return;
      const newTheme = localStorage.getItem(storageKey);
      if (newTheme) {
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, themes, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

Theme.Button = Button;

export default Theme;
