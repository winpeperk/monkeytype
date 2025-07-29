import { Box, Text, Flex } from "@chakra-ui/react"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Scatter, Label, Area } from "recharts"
import { FaCat } from "react-icons/fa"

const colors = {
    wpm: "rgb(var(--text-secondary))",
    raw: "rgb(var(--text-primary))",
    errors: "rgb(var(--errors))"
}

const Chart = ({time, errors, wpm, raw}) => {
    const dataLine = Array.from({length: time}, (_,index) => ({
        time: index + 1,
        wpm: wpm[index],
        raw: raw[index],
        errors: errors[index]
    }))

    const handleDots = (name) => ({cx, cy, payload}) => {
        if(name == "errors" && payload.errors == 0) return null
        return (
            <circle cx={cx} cy={cy} fill={colors[name]} r={4}/>
        )
    }

    const handleTooltip = ({payload, label, active}) => active ? (
        <Box bg="rgba(var(--tooltip-background), 0.9)" color="rgb(var(--background-primary))" borderRadius="md" p="2">
            <Text>{label}</Text>
            {payload.map(({name, value}, index) => name != "time" ? (
                <Flex key={index} direction="row" align="center" justify="flex-start" gap="1">
                    <FaCat color={colors[name]}/>
                    <Text>{name}: {value}</Text>
                </Flex>
            ) : null)}
        </Box>
    ) : null

    return (
        <ResponsiveContainer width="80%" height={250}>
            <ComposedChart data={dataLine} margin={{top: 15}}>
                    <CartesianGrid yAxisId="left" stroke="rgb(var(--tooltip-background))"/>
                    <XAxis dataKey="time" stroke="rgb(var(--tooltip-background))" tick={{fill: "rgb(var(--text-primary))"}}/>
                    <YAxis yAxisId="left" orientation="left" type="number" stroke="rgb(var(--tooltip-background))" tick={{fill: "rgb(var(--text-primary))"}}>
                        <Label value="words per minute" position="center" angle={-90} offset={-10}/>
                    </YAxis>
                    <YAxis yAxisId="right" orientation="right" allowDecimals={false} type="number" domain={[0, "dataMax"]} stroke="rgb(var(--tooltip-background))" tick={{fill: "rgb(var(--text-primary))"}}>
                        <Label value="errors" position="center" angle={90}/>
                    </YAxis>
                    <Tooltip cursor={false} content={handleTooltip}/>
                    <Area yAxisId="left" type="monotone" dataKey="raw" fill="rgba(var(--tooltip-background), 0.1)" stroke={colors.raw} strokeWidth={3} activeDot={handleDots("raw")}/>
                    <Area yAxisId="left" type="monotone" dataKey="wpm" fill="rgba(var(--tooltip-background), 0.3)" stroke={colors.wpm} strokeWidth={3} activeDot={handleDots("wpm")}/>
                    <Scatter yAxisId="right" name="errors" dataKey="errors" shape={handleDots("errors")}/>
            </ComposedChart>
        </ResponsiveContainer>
    )
}

export default Chart