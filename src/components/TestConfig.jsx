import { Text, Flex, Divider as ChakraDivider, Button } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { FaClock, FaAt, FaHashtag, FaFont, FaQuoteLeft } from "react-icons/fa"

const OptionButton = ({color, onClick, children}) => (
    <Button
        border="none"
        bg="transparent"
        color={color}
        _hover={{color: "rgb(var(--menu-focus))", backgroundColor: "transparent"}}
        onClick={onClick}
        fontFamily="IBM Plex Mono"
        fontWeight={400}
    >
        {children}
    </Button>
)

// eslint-disable-next-line no-unused-vars
const Option = ({Icon, children, onClick}) => {
    return (
        <OptionButton
            color="rgb(var(--text-primary))"
            onClick={() => onClick(children)}
        >
            <Flex gap={1.5}>
                <Icon/>
                <Text>{children}</Text>
            </Flex>
        </OptionButton>
    )
}

const Divider = () => (
    <ChakraDivider
        orientation="vertical"
        borderWidth={4}
        borderRadius={6}
        height="20px"
        borderColor="rgb(var(--background-primary))"
        opacity={1}
        mx="1vw"
    />
)

const TimeOptions = ({time, setTime}) => {
    const times = [15, 30, 60, 120, 1000]

    return times.map(curTime => (
        <OptionButton
            key={curTime} 
            onClick={() => setTime(curTime)}
            color={curTime == time ? "rgb(var(--text-secondary))" : "rgb(var(--text-primary))"}
        >
        {curTime}
        </OptionButton>
    ))
}

const WordsOptions = ({word}) => {
    const words = [10, 25, 50, 100]

    return words.map(curWord => (
        <OptionButton
            key={word}
            color={curWord == word ? "rgb(var(--text-secondary))" : "rgb(var(--text-primary))"}
        >
            word
        </OptionButton>
    ))
}

const TestConfig = ({time, setTime}) => {
    const [isOpen, setOpen] = useState("time")
    const idTimer = useRef(null)

    const onClick = (option) => {
        clearTimeout(idTimer.current)
        if(isOpen != option)
            idTimer.current = setTimeout(() => setOpen(option), 200)
    }

    return (
        <Flex
            w={{
                base: "30%",
                sm: "85%"
            }}
            h="45px"
            borderRadius={8}
            bg="rgb(var(--keypad-background))"
            mb={10}
            align="center"
            justifyContent="center"
        >
            <Option Icon={FaAt}>punctuation</Option>
            <Option Icon={FaHashtag}>numbers</Option>
            <Divider/>
            <Option Icon={FaClock} onClick={onClick}>time</Option>
            <Option Icon={FaFont} onClick={onClick}>words</Option>
            <Option Icon={FaQuoteLeft} onClick={onClick}>quote</Option>
            <Divider/>
            {(isOpen == "time") ? (
                <TimeOptions time={time} setTime={setTime}/>
            ) : null}
        </Flex>
    )
}

export default TestConfig