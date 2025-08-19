import { Text, Box, Flex, Divider as ChakraDivider, Button, useTheme, useDisclosure, Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/react"
import { FaClock, FaAt, FaHashtag, FaFont, FaQuoteLeft, FaCog } from "react-icons/fa"
import { useContext } from "react"
import ResizeContext from "./ResizeContext"

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

const MobileOption = ({ onClick, active, isDisabled, children}) => {
    const theme = useTheme()

    return (
        <Button
            isDisabled={isDisabled}
            border="none"
            w="250px"
            p="8px"
            bg={active ? theme.colors.text_secondary : theme.colors.keypad_bg }
            color={active ? theme.colors.bg : theme.colors.focus}
            _hover={{color: theme.colors.bg, bg: theme.colors.focus}}
            _focus={{boxShadow: "none"}}
            onClick={onClick}
            fontFamily="IBM Plex Mono"
            fontWeight={400}
            fontSize="20px"
        >
            <Text>{children}</Text>
        </Button>
    )
}

const Options = ({ options, activeOption, onClick}) => {
    const { width } = useContext(ResizeContext)

    const Component = width >= 768 ? Option : MobileOption
    
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

const MobileModalButton = ({width, children}) => {
    const theme = useTheme()
    const {isOpen, onOpen, onClose} = useDisclosure()

    return width >= 768 ? <>{children}</> : (
        <>
            <Button w="180px" onClick={onOpen} bg={theme.colors.keypad_bg} color={theme.colors.text_primary} fontSize="13px" fontFamily="IBM Plex Mono" _hover={{bg: theme.colors.focus, color: theme.colors.keypad_bg}}>
                <Flex gap={2}>
                    <FaCog/>
                    Test settings
                </Flex>
            </Button>
            <Modal blockScrollOnMount={false}  isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent h="650px" w="300px" bg={theme.colors.bg} borderColor={theme.colors.keypad_bg} borderWidth="4px" borderRadius={10}>
                    <ModalBody alignContent="center" justifyItems="center" h="100%">
                        {children}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

const TestConfig = ({ settings, setSettings }) => {
    const theme = useTheme()
    const { width } = useContext(ResizeContext)

    const Component = width >= 768 ? Option : MobileOption
 
    const {mode, options, extraMode} = settings
    const {punctuation, numbers} = extraMode

    const times = [15, 30, 60, 999]
    const words = [10, 25, 50, 100]
    const quote = ["all", "short", "medium", "long", "thicc"]

    const setMode = (curMode) => () => mode != curMode ? setSettings(prev => {prev.mode = curMode}) : null
    const setOption = (curOption) => () => options[mode] != curOption ? setSettings(prev => {prev.options[mode] = curOption}) : null
    const setPunctuation = () => setSettings(prev => {prev.extraMode.punctuation = !prev.extraMode.punctuation})
    const setNumbers = () => setSettings(prev => {prev.extraMode.numbers = !prev.extraMode.numbers})

    return (
        <MobileModalButton width={width}>
            <Flex
                direction={{
                    base: "column",
                    md: "row"
                }}
                w={{
                    sm: "95%",
                    lg: "85%"
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
                    sm: 10
                }}
                px={{
                    sm: 5
                }}
                align="center"
                justifyContent="center"
            >
                {mode !== "quote" || width < 768 ? (
                    <>
                        <Component Icon={FaAt} onClick={setPunctuation} active={punctuation} isDisabled={mode !== "time"}>punctuation</Component>
                        <Component Icon={FaHashtag} onClick={setNumbers} active={numbers} isDisabled={mode !== "time"}>numbers</Component>
                        {width >= 768 ? <Divider/> : <Box/>}
                    </>
                ) : null}
                <Component Icon={FaClock} onClick={setMode("time")} active={mode == "time"}>time</Component>
                <Component Icon={FaFont} onClick={setMode("words")} active={mode == "words"}>words</Component>
                <Component Icon={FaQuoteLeft} onClick={setMode("quote")} active={mode == "quote"}>quote</Component>
                {width >= 768 ? <Divider/> : <Box/>}
                {(mode == "time") ? (
                    <Options options={times} activeOption={options[mode]} onClick={setOption}/>
                ) : 
                (mode == "words") ? (
                    <Options options={words} activeOption={options[mode]} onClick={setOption}/>
                ) : 
                (mode == "quote") ? (
                    <Options options={quote} activeOption={options[mode]} onClick={setOption}/>
                ) : null}
            </Flex>
        </MobileModalButton>
    )
}

export default TestConfig