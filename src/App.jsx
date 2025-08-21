import { useImmer } from "use-immer";
import TyperContainer from "./components/TyperContainer";
import StatGrid from "./components/StatGrid";
import { useEffect, useState, useRef } from "react";
import ResizeContext from "./components/ResizeContext";
import Header from "./components/Header";
import TestConfig from "./components/TestConfig";
import { Center, Button } from "@chakra-ui/react";
import SwitchTextLanguage from "./components/SwitchTextLanguage"

const storageKey = "divider"

const initStat = {
  incorrect: 0,
  correct: 0,
  extra: 0,
  missed: 0,
  errors: [],
  correctChars: 0,
  rawChars: 0,
  wpm: [],
  raw: [],
  afk: 0
}

const App = () => {
  const [stat, setStat] = useImmer(initStat);
  const [testState, setTestState] = useState(false);
  const [settings, setSettings] = useImmer({
    mode: "time",
    options: {
      time: 15, 
      words: 10, 
      quote: "all"
    },
    extraMode: {
      punctuation: false,
      numbers: false,
    },
    elapsedTime: 0,
    language: "russian"
  })
  const [divider, setDivider] = useState(true)
  const [width, setWidth] = useState(window.innerWidth)
  const [text, setText] = useState("Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere voluptatibus, voluptatum alias sint eum earum unde, ad neque quo in perspiciatis voluptas beatae ipsam voluptatem, iste quisquam voluptates. Recusandae, adipisci.")
  const k = useRef(0);

  useEffect(() => {
    const handleWidth = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleWidth)
    return () => {
      window.removeEventListener("resize", handleWidth)
    }
  }, [])

  useEffect(() => {
    setStat(initStat)
    setSettings(prev => {prev.elapsedTime = 0})
    setTestState("pending")
    k.current++
    if(k.current % 2 == 0)
      setText("Dogs sum dolor sit, amet consectetur adipisicing elit. Facere voluptatibus, voluptatum alias sint eum earum unde, ad neque quo in perspiciatis voluptas beatae ipsam voluptatem, iste quisquam voluptates. Recusandae, adipisci.")
    else
      setText("Cats sum dolor sit, amet consectetur adipisicing elit")
  }, [settings.mode, settings.options, settings.extraMode, settings.language, setStat, setSettings])

  useEffect(() => {
    let initDivider = JSON.parse(localStorage.getItem(storageKey))
    if(initDivider != null) {
      setDivider(initDivider)
    }

    const handleStorage = (event) => {
      if(event.key != storageKey) return
      const newItem = JSON.parse(localStorage.getItem(event.key))
      setDivider(newItem)
    }
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(divider))
  }, [divider])

  return (
    <ResizeContext.Provider value={{ width }}>
      <Header/>
      <Center flexDirection="column">
        <div>{settings.elapsedTime}</div>
        <div>{stat.rawChars}</div>
        <div>{stat.correctChars}</div>
        {testState != "finished" ? (
          <>
            <TestConfig settings={settings} setSettings={setSettings}/>
            <SwitchTextLanguage settings={settings} setSettings={setSettings}/>
            <TyperContainer
              settings={settings}
              setSettings={setSettings}
              setStat={setStat}
              setTestState={setTestState}
              testState={testState}
              key={text}
              initialText={text}
              divider={divider}
            />
          </>
        ) : (
          <StatGrid stat={stat} settings={settings}/>
        )}
      </Center>
      <Button onClick={() => setDivider(prev => !prev)}>switch divider</Button>
    </ResizeContext.Provider>
  );
};

export default App;
