import { FaKeyboard, FaCrown, FaInfo, FaCog, FaBell, FaUser, FaSignOutAlt, FaChartLine } from "react-icons/fa"
import { FaEarthAmericas } from "react-icons/fa6"
import { Button, Flex, Tooltip, Spacer, Link, Menu, MenuButton, MenuList, MenuItem, useDisclosure } from "@chakra-ui/react"
import { useRef } from "react"

// eslint-disable-next-line no-unused-vars
const Icon = ({IconComponent, src, tooltip = null, mt = 0}) => { 
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
            <Link href={src} p="8px" color="rgb(var(--text-primary))" _hover={{color: "rgb(var(--logo-second))"}} mt={mt}>
                <IconComponent size={25}/>
            </Link>
        </Tooltip>
    )
}
// eslint-disable-next-line no-unused-vars
const UserMenuItem = ({MenuIcon, isFirst, isLast, children}) => (
    <MenuItem 
        as="a" 
        href="#" 
        bg="transparent"
        borderRadius={6}
        _hover={{
            backgroundColor: "rgb(var(--menu-focus))", 
            color: "rgb(var(--keypad-background))"
        }}
    >
        <MenuIcon style={{marginRight: "10px"}}/>
        {children}
    </MenuItem>
)

const UserMenu = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const idTimer = useRef(null)

    const handleOpen = () => {
        clearTimeout(idTimer.current)
        idTimer.current = setTimeout(onOpen, 200)
    }

    const handleClose = () => {
        clearTimeout(idTimer.current)
        idTimer.current = setTimeout(onClose, 100)
    }

    return (
    <Menu isOpen={isOpen}>
        <MenuButton 
            color="rgb(var(--text-primary))"
            _hover={{color: "rgb(var(--logo-second))"}}
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
            p="8px"
        >
            <FaUser size={25}/>
        </MenuButton>
        <MenuList
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
            bg="rgb(var(--keypad-background))"
            color="rgb(var(--menu-focus))"
            p={0}
            border="none"
        >
            <UserMenuItem MenuIcon={FaChartLine}>User stats</UserMenuItem>
            <UserMenuItem MenuIcon={FaEarthAmericas}>Public profile</UserMenuItem>
            <UserMenuItem MenuIcon={FaCog}>Account settings</UserMenuItem>
            <UserMenuItem MenuIcon={FaSignOutAlt}>Sign out</UserMenuItem>
        </MenuList>
    </Menu>
)}

const Navigation = () => {
    return (
        <Flex w="100%">
            <Flex gap={2}>
                <Icon IconComponent={FaKeyboard} src="#" tooltip="start test" mt="2px"/>
                <Icon IconComponent={FaCrown} src="#" tooltip="leaderboards"/>
                <Icon IconComponent={FaInfo} src="#" tooltip="about"/>
                <Icon IconComponent={FaCog} src="#" tooltip="settings" mt="1px"/>
            </Flex>
            <Spacer/>
            <Flex gap={2}>
                <Button style={{backgroundColor: "transparent"}} p="0" _hover={{color: "rgb(var(--logo-second))"}} color="rgb(var(--text-primary))">
                    <FaBell 
                        size={25}
                        style={{
                            marginTop: "-4px",
                        }}
                    />
                </Button>
                <UserMenu/>
            </Flex>
        </Flex>
    )
}

export default Navigation