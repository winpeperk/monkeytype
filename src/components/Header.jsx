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
                        fontSize: "32px",
                        fontFamily: "Lexend Deca",
                    }}
                >
                    <span style={{color: "rgb(var(--logo))"}}>
                        kitty
                    </span>
                    <span style={{color: "rgb(var(--text-secondary))"}}>
                        type
                    </span>
                </a>
            ) : null}
            <Navigation/>
        </Flex>
    )
}

export default Header