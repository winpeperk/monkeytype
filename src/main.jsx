import { ChakraProvider, Container } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Theme from "./components/Theme";
import { createGlobalStyle } from "styled-components";
import "./index.css";

const ContainerSize = {
  base: "100%",
  sm: "85%",
  lg: "80%",
};

const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    background: rgb(var(--background-primary));
    font-family: "Roboto Mono";
    color: rgb(var(--text-primary));
  }
`;

createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <Theme>
      <Container maxWidth={ContainerSize}>
        <Global />
        <App />
      </Container>
      <Theme.Button />
    </Theme>
  </ChakraProvider>,
);
