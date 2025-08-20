import { Text, Flex, Divider as ChakraDivider, Button, useTheme, Spacer } from "@chakra-ui/react"
import { FaClock, FaAt, FaHashtag, FaFont, FaQuoteLeft, FaCog } from "react-icons/fa"
import { useContext } from "react"
import ResizeContext from "./ResizeContext"
import Modal from "./Modal"

const Divider = () => {
    const theme = useTheme()
    const { width } = useContext(ResizeContext)

    return (
    <ChakraDivider
        orientation="vertical"
        borderWidth={4}
        borderRadius={6}
        height="20px"
        borderColor={width >= 768 ? theme.colors.bg : "transparent"}
        opacity={1}
    />
)}

const Option = ({Icon = null, onClick, active, children}) => {
    const theme = useTheme()

    return (
        <Button
            border="none"
            bg="transparent"
            color={active ? theme.colors.text_secondary : theme.colors.text_primary}
            _hover={{color: theme.colors.focus, backgroundColor: "transparent"}}
            _focus={{boxShadow: "none"}}
            onClick={onClick}
            fontFamily="IBM Plex Mono"
            fontWeight={400}
            fontSize={{
                md: "11px",
                lg: "13px"
            }}
        >
            <Flex gap={1.5}>
                {Icon && <Icon/>}
                <Text>{children}</Text>
            </Flex>
        </Button>
    )
}

const Options = ({ options, activeOption, onClick}) => {
    const { width } = useContext(ResizeContext)

    const Component = width >= 768 ? Option : Modal.Button
    
    return options.map(curOption => (
        <Component
            key={curOption} 
            onClick={onClick(curOption)}
            active={curOption == activeOption}
        >
        {curOption}
        </Component>
    ))
}

const MobileModal = ({children}) => {
    const { width } = useContext(ResizeContext)

    const ButtonContent = (
        <Flex gap={2}>
            <FaCog/>
            Test settings
        </Flex>
    )
    
    return width >= 768 ? <>{children}</> : <Modal buttonContent={ButtonContent}>{children}</Modal>
}

const TestConfig = ({ settings, setSettings }) => {
    const theme = useTheme()
    const { width } = useContext(ResizeContext)
    const {mode, options, extraMode} = settings
    const {punctuation, numbers} = extraMode

    const listOptions = {
        time: [15, 30, 60, 999],
        words: [10, 25, 50, 100],
        quote: ["all", "short", "medium", "long", "thicc"]
    }

    const setMode = (curMode) => () => setSettings(prev => {
        prev.mode = curMode
        if(curMode == "quote") {
            prev.extraMode.punctuation = false
            prev.extraMode.numbers = false
        }
    })
    const setOption = (curOption) => () => setSettings(prev => {prev.options[mode] = curOption})
    const setPunctuation = () => setSettings(prev => {prev.extraMode.punctuation = !prev.extraMode.punctuation})
    const setNumbers = () => setSettings(prev => {prev.extraMode.numbers = !prev.extraMode.numbers})

    const Component = width >= 768 ? Option : Modal.Button

    return (
        <MobileModal>
            <Flex
                direction={{
                    base: "column",
                    md: "row"
                }}
                w={{
                    base: "100%"
                }}
                maxW={{
                    md: "fit-content"
                }}
                h={{
                    base: "100%",
                    md: "45px"
                }}
                gap={{
                    base: "1vh",
                    md: "0.1vw",
                    lg: "0.3vw"
                }}
                borderRadius={8}
                bg={{
                    base: "transparent",
                    md: theme.colors.keypad_bg
                }}
                mb={{
                    md: 10
                }}
                px={{
                    md: 5
                }}
                align="center"
                justifyContent="center"
            >
                {mode !== "quote" || width < 768 ? (
                    <>
                        <Component Icon={FaAt} onClick={setPunctuation} active={punctuation} isDisabled={mode == "quote"}>punctuation</Component>
                        <Component Icon={FaHashtag} onClick={setNumbers} active={numbers} isDisabled={mode == "quote"}>numbers</Component>
                        {width >= 768 ? <Divider/> : <Spacer/>}
                    </>
                ) : null}
                <Component Icon={FaClock} onClick={setMode("time")} active={mode == "time"}>time</Component>
                <Component Icon={FaFont} onClick={setMode("words")} active={mode == "words"}>words</Component>
                <Component Icon={FaQuoteLeft} onClick={setMode("quote")} active={mode == "quote"}>quote</Component>
                {width >= 768 ? <Divider/> : <Spacer/>}
                <Options options={listOptions[mode]} activeOption={options[mode]} onClick={setOption}/>
            </Flex>
        </MobileModal>
    )
}

export default TestConfig