import { useImmer } from "use-immer";
import TyperContainer from "./components/TyperContainer";
import StatGrid from "./components/StatGrid";
import { useEffect, useState, useRef } from "react";
import ResizeContext from "./components/ResizeContext";
import Header from "./components/Header";
import TestConfig from "./components/TestConfig";
import { Center, Button } from "@chakra-ui/react";

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
  const [isTyped, setIsTyped] = useState("typing");
  const [time, setTime] = useState(15)
  const [divider, setDivider] = useState(null)
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
    k.current++
    if(k.current % 2 == 0)
      setText("Lorem sum dolor sit, amet consectetur adipisicing elit. Facere voluptatibus, voluptatum alias sint eum earum unde, ad neque quo in perspiciatis voluptas beatae ipsam voluptatem, iste quisquam voluptates. Recusandae, adipisci.")
    else
      setText("Kakish sum dolor sit, amet consectetur adipisicing elit. Facere voluptatibus, voluptatum alias sint eum earum unde, ad neque quo in perspiciatis voluptas beatae ipsam voluptatem, iste quisquam voluptates. Recusandae, adipisci.")
  }, [time, setStat, k])

  useEffect(() => {
    let initDivider = localStorage.getItem(storageKey)
    if(initDivider == null) {
      initDivider = true
      localStorage.setItem(storageKey, JSON.stringify(initDivider))
    } else {
      initDivider = JSON.parse(initDivider)
    }
    setDivider(initDivider)
  }, [])

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(divider))
  }, [divider])

  return (
    <ResizeContext.Provider value={{ width }}>
      <Header/>
      <Center flexDirection="column">
        {isTyped == "typing" ? (
          <>
            <TestConfig time={time} setTime={setTime}/>
            <TyperContainer
              time={time}
              setStat={setStat}
              setIsTyped={setIsTyped}
              key={text}
              initialText={text}
              divider={divider}
            />
          </>
        ) : (
          <StatGrid stat={stat} time={time} width={width}/>
        )}
      </Center>
      <Button onClick={() => setDivider(prev => !prev)}>switch divider</Button>
    </ResizeContext.Provider>
  );
};

export default App;
