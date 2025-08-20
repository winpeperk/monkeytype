import { useDisclosure, useTheme, Button, Modal as ChakraModal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/react"

const ModalButton = ({ onClick, active, isDisabled, children}) => {
    const theme = useTheme()

    return (
        <Button
            isDisabled={isDisabled}
            border="none"
            w="100%"
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
            {children}
        </Button>
    )
}

const Modal = ({buttonContent = null, buttonOption = 1, children}) => {
    const theme = useTheme()
    const {isOpen, onOpen, onClose} = useDisclosure()

    return (
        <>
            <Button
                w="180px"
                onClick={onOpen}
                bg={buttonOption == 1 ? theme.colors.keypad_bg : "transparent"}
                color={theme.colors.text_primary}
                fontSize={buttonOption == 1 ? "13px" : "16px"}
                fontFamily="IBM Plex Mono"
                fontWeight={400}
                _hover={{
                    bg: buttonOption == 1 ? theme.colors.focus : "transparent",
                    color: buttonOption == 1 ? theme.colors.keypad_bg : theme.colors.focus
                }}
                >
                {buttonContent}
            </Button>
            <ChakraModal blockScrollOnMount={false} isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent w="300px" bg={theme.colors.bg} borderColor={theme.colors.keypad_bg} borderWidth="4px" borderRadius={10}>
                    <ModalBody alignContent="center" justifyItems="center" h="100%" p="20px">
                        {children}
                    </ModalBody>
                </ModalContent>
            </ChakraModal>
        </>
    )
}

Modal.Button = ModalButton

export default Modal 