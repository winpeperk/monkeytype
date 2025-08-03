import { Flex, Grid, GridItem } from "@chakra-ui/react"
import Group from "./Group.jsx"
import Chart from "./Chart.jsx"

const average = (array) => {
    if(array.length === 0) return 0
    return Math.round((array.reduce((sum, currentWpm) => sum + currentWpm, 0) / array.length) * 100) / 100
}

const StatWpm = ({wpm}) => {
    const averageWpm = average(wpm)
    return (
        <Group
            header="wpm"
            body={Math.round(averageWpm)}
            tooltip={`${averageWpm} wpm`}
            fontSize={64}
        />
    )
}

const StatRaw = ({raw}) => {
    const averageRaw = average(raw)
    return (
        <Group
            header="raw"
            body={Math.round(averageRaw)}
            tooltip={`${averageRaw} raw`}
        />
    )
}

const StatAccuracy = ({correctChars, errors, rawChars}) => {
    const incorrectDuringTheGame = errors.reduce((sum, error) => sum + error, 0)
    const accuracy = Math.round(((correctChars / rawChars) * 100) * 100) / 100
    return (
        <Group
            header="acc"
            body={`${Math.round(accuracy)}%`}
            tooltip={<>
                {accuracy}%<br/>
                {correctChars} correct<br/>
                {incorrectDuringTheGame} incorrect<br/>
            </>}
            fontSize={64}
        />
    )
}

const RoundInfo = ({time}) => (
    <Group
        header="test type"
        body={<>
            time {time}<br/>
            english
        </>}
        fontSize={32}
        size="small"
    />
)

const StatCharacters = ({correct, incorrect, extra, missed}) => (
    <Group
        header="characters"
        body={`${correct}/${incorrect}/${extra}/${missed}`}
        tooltip={<>
            correct<br/>
            incorrect<br/>
            extra<br/>
            missed<br/>
        </>}
    />
)

const StatConsistency = ({raw}) => {
    const averageRaw = average(raw)
    const standardDeviation = () => {
        let deviation = 0;
        deviation = raw.reduce((sum, item) => sum + (item - averageRaw) ** 2, 0);
        return Math.sqrt(deviation / raw.length);
    }
    const consistency = Math.round((100 - (standardDeviation() / averageRaw) * 100) * 100) / 100
    return (
        <Group
            header="consistency"
            body={`${Math.round(consistency)}%`}
            tooltip={`${consistency}% consistency`}
        />
    )
}

const StatAfk = ({time, afk}) => {
    const afkPercent = time == 0 ? 0 : Math.round((afk / time * 100) * 100) / 100
    return (
        <Group
            header="time"
            body={`${time}s`}
            footer={`${afkPercent}% afk`}
            tooltip={`${time}s (${afk}s afk ${afkPercent}%)`}
        />
    )
}

const StatGrid = ({stat, time}) => {
    const {incorrect, correct, extra, missed, correctChars, rawChars, errors, wpm, raw, afk} = stat
    return (
        <Grid
            h={{
                base: "110%",
                md: "70%"
            }}
            templateColumns={{
                base: "1fr",
                lg: "1fr 7fr"
            }}
            templateRows={{
                base: "0.5fr 2fr 2fr 1fr",
                lg: "3fr 1fr 1fr"
            }}
            gap="4"
        >
        <GridItem
            placeSelf="flex-start"
            w="100%"
        >
            <Flex
                direction={{
                    base: "row",
                    lg: "column"
                }}
                h="100%"
                align="flex-start"
                justifyContent={{
                    base: "space-around",
                    lg: "flex-start"
                }}
            >
                <StatWpm wpm={wpm}/>
                <StatAccuracy correctChars={correctChars} errors={errors} rawChars={rawChars}/>
            </Flex>
        </GridItem>
        <GridItem>
            <Chart time={time} errors={stat.errors} wpm={stat.wpm} raw={stat.raw}/>
        </GridItem>
        <GridItem
        colSpan={{
            base: 1,
            lg: 2
        }}
        >
            <Grid
                templateColumns={{
                    base: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(5, 1fr)"
                }}
                templateRows={{
                    base: "repeat(3, 1fr)",
                    md: "repeat(2, 1fr)",
                    lg: "1fr"
                }}
                gap={{
                    base: "5",
                    lg: "20"
                }}
            >
                <GridItem>
                    <RoundInfo time={time}/>
                </GridItem>
                <GridItem>
                    <StatRaw raw={raw}/>
                </GridItem>
                <GridItem>
                    <StatCharacters correct={correct} incorrect={incorrect} extra={extra} missed={missed}/>
                </GridItem>
                <GridItem>
                    <StatConsistency raw={raw}/>
                </GridItem>
                <GridItem>
                    <StatAfk time={time} afk={afk}/>
                </GridItem>
            </Grid>
        </GridItem>
        <GridItem
            rowSpan={{
                base: 1,
                md: 1
            }}
            colSpan={{
                base: 1,
                lg: 2
            }}
        >
        </GridItem>
        </Grid>
    )
} 

export default StatGrid