import Navigation from "./Navigation"
import { Flex, useTheme } from "@chakra-ui/react"
import ResizeContext from "./ResizeContext"
import { useContext } from "react"

const Header = () => {
    const { width } = useContext(ResizeContext)
    const theme = useTheme()

    return (
        <Flex
            h="36px"
            gap={2}
            mb={10}
        >
            {width >= 768 ? (
                <a
                    href="#"
                    style={{
                        fontSize: "40px",
                        fontFamily: "Lexend Deca",
                    }}
                >
                    <span style={{color: theme.colors.logo_first}}>
                        kitty
                    </span>
                    <span style={{color: theme.colors.logo_second}}>
                        type
                    </span>
                </a>
            ) : null}
            <Navigation/>
        </Flex>
    )
}

export default Header