import { Text, Flex, Divider as ChakraDivider, Button, useTheme } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { FaClock, FaAt, FaHashtag, FaFont, FaQuoteLeft } from "react-icons/fa"

const OptionButton = ({color, onClick, children}) => {
    const theme = useTheme()

    return (
    <Button
        border="none"
        bg="transparent"
        color={color}
        _hover={{color: theme.colors.focus , backgroundColor: "transparent"}}
        _focus={{boxShadow: "none", bg: "transparent"}}
        onClick={onClick}
        fontFamily="IBM Plex Mono"
        fontWeight={400}
        fontSize={12}
    >
        {children}
    </Button>
)}
// eslint-disable-next-line no-unused-vars
const Option = ({Icon, children, onClick}) => {
    const theme = useTheme()

    return (
        <OptionButton
            color={theme.colors.text_primary}
            onClick={() => onClick(children)}
        >
            <Flex gap={1.5}>
                <Icon/>
                <Text>{children}</Text>
            </Flex>
        </OptionButton>
    )
}

const Divider = () => {
    const theme = useTheme()

    return (
    <ChakraDivider
        orientation="vertical"
        borderWidth={4}
        borderRadius={6}
        height="20px"
        borderColor={theme.colors.bg}
        opacity={1}
        mx="1vw"
    />
)}

const TimeOptions = ({time, setTime}) => {
    const theme = useTheme()
    const times = [15, 30, 60, 999]

    const handleOption = (curTime) => (e) => {
        e.preventDefault()
        setTime(curTime)
    }

    return times.map(curTime => (
        <OptionButton
            key={curTime} 
            onClick={handleOption(curTime)}
            color={curTime == time ? theme.colors.text_secondary : theme.colors.text_primary}
        >
        {curTime}
        </OptionButton>
    ))
}

const WordsOptions = ({word}) => {
    const theme = useTheme()
    const words = [10, 25, 50, 100]

    return words.map(curWord => (
        <OptionButton
            key={word}
            color={curWord == word ? theme.colors.text_secondary : theme.colors.text_primary}
        >
            word
        </OptionButton>
    ))
}

const TestConfig = ({time, setTime}) => {
    const theme = useTheme()
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
            bg={theme.colors.keypad_bg}
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