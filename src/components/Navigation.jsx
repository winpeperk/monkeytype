import { FaKeyboard, FaCrown, FaInfo, FaCog, FaBell, FaUser } from "react-icons/fa"
import { Button, Flex, Tooltip, Spacer } from "@chakra-ui/react"

// eslint-disable-next-line no-unused-vars
const Icon = ({IconComponent, src, tooltip = null}) => { 
    return (
        <Tooltip 
            label={tooltip}
            placement="bottom"
            sx={{
                backgroundColor: "rgba(var(--tooltip-background), 0.9)",
                color: "rgb(var(--background-primary))",
            }}
            borderRadius="md"
            p="1"
            fontSize={16}
            openDelay={200}
            closeDelay={100}
        >
            <a href={src} style={{padding: "8px"}}>
                <IconComponent size={20} color="rgb(var(--text-primary))"/>
            </a>
        </Tooltip>
    )
}

const Menu = () => (
    <Flex
        direction="column"
        gap={2}
    >
        <a href="#" _hover={{backgroundColor: "rgb(var(--background-primary))", color:"rgb(var())"}}>User Stat</a>
        <a href="#">Public profile</a>
        <a href="#">Account settings</a>
        <a href="#">Sign out</a>
    </Flex>
)

const Navigation = () => {
    return (
        <Flex w="100%">
            <Flex gap={2}>
                <Icon IconComponent={FaKeyboard} src="#" tooltip="start test"/>
                <Icon IconComponent={FaCrown} src="#" tooltip="leaderboards"/>
                <Icon IconComponent={FaInfo} src="#" tooltip="about"/>
                <Icon IconComponent={FaCog} src="#" tooltip="settings"/>
            </Flex>
            <Spacer/>
            <Flex gap={2}>
                <Button style={{backgroundColor: "transparent",}}>
                    <FaBell 
                        size={20}
                        style={{
                            color: "rgb(var(--text-primary))"
                        }}
                    />
                </Button>
                <Icon IconComponent={FaUser} src="#" />
            </Flex>
        </Flex>
    )
}

export default Navigation