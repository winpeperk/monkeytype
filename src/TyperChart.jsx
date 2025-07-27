import { Box, Text, Flex } from "@chakra-ui/react"
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Scatter, Label, Area } from "recharts"
import { FaCat } from "react-icons/fa"

const TyperChart = ({time, errors, wpm, raw}) => {
    const dataLine = Array.from({length: time}, (_,index) => ({
        time: index + 1,
        wpm: wpm[index],
        raw: raw[index],
        errors: errors[index]
    }))

    const handleColor = ({cx, cy, payload}) => {
        const color = payload.errors == 0 ? "transparent" : "rgb(var(--accent))"
        return <circle cx={cx} cy={cy} fill={color} r="3"/> 
    }


    const handleTooltip = ({payload, label, active}) => active ? (
        <Box bg="rgba(var(--tooltip-background), 0.9)" color="rgb(--text-primary)" borderRadius="md" p="2">
            <Text>{label}</Text>
            {payload.map(({name, color, value}, index) => name != "time" ? (
                <Flex key={index} direction="row" align="center" justify="flex-start" gap="1" color={name == "error" ? "rgb(var(--accent))" : color}>
                    <FaCat/>
                    <Text>{name}: {value}</Text>
                </Flex>
            ) : null)}
        </Box>
    ) : null

    return (
        <ResponsiveContainer width="90%" height={300} style={{outline: "none", border:  "none"}} tabIndex={-1}>
            <ComposedChart data={dataLine}>
                    <XAxis dataKey="time" stroke="rgb(var(--tooltip-background))"/>
                    <YAxis yAxisId="left" orientation="left" allowDecimals={false} type="number" domain={[0, "dataMax"]} stroke="rgb(var(--tooltip-background))">
                        <Label value="words per minute" position="center" angle={-90} offset={-10}/>
                    </YAxis>
                    <YAxis yAxisId="right" orientation="right" allowDecimals={false} type="number" domain={[0, "dataMax"]} stroke="rgb(var(--tooltip-background))">
                        <Label value="errors" position="center" angle={90}/>
                    </YAxis>
                    <Tooltip content={handleTooltip}/>
                    <Area yAxisId="left" type="monotone" dataKey="raw" fill="rgb(var(--shadow-raw))" stroke="rgb(var(--text-primary))" strokeWidth={3}/>
                    <Area yAxisId="left" type="monotone" dataKey="wpm" fill="rgb(var(--shadow-wpm))" stroke="rgb(var(--text-secondary))" strokeWidth={3}/>
                    <Scatter yAxisId="right" name="errors" dataKey="errors" shape={handleColor}/>
                    <CartesianGrid stroke="rgb(var(--tooltip-background))"/>
            </ComposedChart>
        </ResponsiveContainer>
    )
}

export default TyperChart