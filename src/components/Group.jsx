import styled from "styled-components"
import { Tooltip, useTheme } from "@chakra-ui/react"

const Container = styled.div(props => `
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: "IBM Plex Mono";
    cursor: ${props.cursor == null ? "default" : "pointer"};
`)

const Header = styled.div(props => `
    font-size: ${props.fontSize ? `${props.fontSize * 0.5}px` : "16px"};
`)

const Body = styled.div(props => `
    font-size: ${props.fontSize ? props.size == "small" ? `${props.fontSize * 0.5}px` : `${props.fontSize}px` : "32px"};
    color: ${props.color};
`)

const Footer = styled.div(props => `
    font-size: ${props.fontSize ? `${props.fontSize * 0.4}px` : "12px"};
    color: ${props.color};
`)

const Group = ({header, body, footer = null, tooltip = null, fontSize, size}) => {
    const theme = useTheme()

    return (
        <Tooltip 
            label={tooltip}
            placement="top"
            sx={{
                backgroundColor: theme.colors.opacity_tooltip_bg,
                color: theme.colors.bg,
            }}
            borderRadius="md"
            p="1"
            openDelay={200}
            closeDelay={100}
            fontSize={16}
        >
            <Container cursor={tooltip}>
                <Header fontSize={fontSize}>{header}</Header>
                <Body fontSize={fontSize} size={size} color={theme.colors.text_secondary}>{body}</Body>
                {footer && <Footer fontSize={fontSize} color={theme.colors.opacity_text_primary}>{footer}</Footer>}
            </Container>
        </Tooltip>
    )
}

export default Group