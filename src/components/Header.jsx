import Navigation from "./Navigation"
import { Flex } from "@chakra-ui/react"
import ResizeContext from "./ResizeContext"
import { useContext } from "react"

const Header = () => {
    const { width } = useContext(ResizeContext)

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
                    <span style={{color: "rgb(var(--logo-first))"}}>
                        kitty
                    </span>
                    <span style={{color: "rgb(var(--logo-second))"}}>
                        type
                    </span>
                </a>
            ) : null}
            <Navigation/>
        </Flex>
    )
}

export default Header