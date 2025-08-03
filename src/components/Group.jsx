import styled from "styled-components"
import { Tooltip } from "@chakra-ui/react"

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
    color: rgb(var(--text-secondary));
`)

const Footer = styled.div(props => `
    font-size: ${props.fontSize ? `${props.fontSize * 0.4}px` : "12px"};
    color: rgba(var(--text-primary), 0.6);
`)

const Group = ({header, body, footer = null, tooltip = null, fontSize, size}) => {
    return (
        <Tooltip label={tooltip} placement="top">
            <Container cursor={tooltip}>
                <Header fontSize={fontSize}>{header}</Header>
                <Body fontSize={fontSize} size={size}>{body}</Body>
                {footer && <Footer fontSize={fontSize}>{footer}</Footer>}
            </Container>
        </Tooltip>
    )
}

export default Group