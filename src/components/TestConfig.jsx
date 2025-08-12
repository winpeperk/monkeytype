import { Box, Text, Flex, Divider as ChakraDivider, Button } from "@chakra-ui/react"
import { FaClock } from "react-icons/fa"

// eslint-disable-next-line no-unused-vars
const Option = ({Icon, children}) => {
    return (
        <Flex
            gap={1.5}
            _hover={{color: "rgb(var(--text-secondary))"}}
            cursor="pointer"
        >
            <Icon/>
            <Text>{children}</Text>
        </Flex>
    )
}

const Divider = () => (
    <ChakraDivider
        orientation="vertical"
        borderWidth={4}
        borderRadius={6}
        height="17px"
        color="rgb(var(--background-primary))"
        margin="0 25px"
    />
)

const TimeOptions = ({time, setTime}) => {
    const times = [15, 30, 60, 120]

    return times.map(curTime => (
        <Button
            key={curTime} 
            onClick={() => setTime(curTime)}
            border="none"
            bg="transparent"
            _hover={{color: "rgb(var(--text-secondary))", backgroundColor: "transparent"}}
            color={curTime == time ? "rgb(var(--text-secondary))" : "rgb(var(--text-primary))"}
        >
        {curTime}
        </Button>
    ))
}

const TestConfig = ({time, setTime}) => {
    return (
        <Flex
            w={{
                base: "30%",
                sm: "90%"
            }}
            h="40px"
            borderRadius={6}
            bg="rgb(var(--keypad-background))"
            mb={10}
            align="center"
            justifyContent="center"
        >
            <Option Icon={FaClock}>time</Option>
            <Divider/>
            <TimeOptions time={time} setTime={setTime}/>
        </Flex>
    )
}

export default TestConfig