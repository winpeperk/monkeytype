import { Grid, GridItem } from "@chakra-ui/react"

const Wrapper = () => {
    return (
        <Grid
            h={{
                base: "110%",
                md: "40%"
            }}
            templateColumns={{
                base: "1fr",
                md: "repeat(7, 1fr)"
            }}
            templateRows={{
                base: "repeat(5, 1fr)",
                md: "repeat(4, 1fr)"
            }}
            gap="3"
        >
        <GridItem
            rowSpan={{
                base: 1,
                md: 2
            }}
            colSpan={{
                base: 1,
                md: 1
            }}
        >

        </GridItem>
        <GridItem
            rowSpan={{
                base: 1,
                md: 2
            }}
            colSpan={{
                base: 1,
                md: 6
            }}
        >

        </GridItem>
        <GridItem
            rowSpan={{
                base: 2,
                md: 1
            }}
            colSpan={{
                base: 1,
                md: 7
            }}
        >

        </GridItem>
        <GridItem
            rowSpan={{
                base: 1,
                md: 1
            }}
            colSpan={{
                base: 1,
                md: 7
            }}
        >

        </GridItem>

        </Grid>
    )
} 

export default Wrapper