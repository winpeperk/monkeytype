import { FaEarthAmericas } from "react-icons/fa6"
import Modal from "./Modal"
import { Flex } from "@chakra-ui/react"

const SwitchTextLanguage = ({settings, setSettings}) => {
    const { language } = settings
    const listLanguages = ["english", "russian"]

    const handleLanguage = (curLanguage) => () => setSettings(prev => {prev.language = curLanguage})

    const ButtonContent = (
        <Flex gap={2}>
            <FaEarthAmericas/>
            {language}
        </Flex>
    )

    return (
        <Modal buttonContent={ButtonContent} buttonOption={2}>
            <Flex
                direction="column"
                w="100%"
                gap="1vh"
                >
                {listLanguages.map(curLanguage => (
                <Modal.Button key={curLanguage} onClick={handleLanguage(curLanguage)} active={curLanguage == language}>{curLanguage}</Modal.Button>
                ))}
           </Flex>
        </Modal>
    )
}

export default SwitchTextLanguage