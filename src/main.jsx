import { ChakraProvider, Container } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Theme from "./components/Theme";
import { createGlobalStyle } from "styled-components";
import "./index.css";

const containerSize = {
  base: "100%",
  sm: "90%",
  md: "85%"
};

const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    line-height: 100%;
  }
  body {
    background: rgb(var(--background-primary));
    font-family: "Roboto Mono";
    color: rgb(var(--text-primary));
  }
`;

createRoot(document.getElementById("root")).render(
  <ChakraProvider disableGlobalStyle resetCSS>
    <Theme>
      <Container maxWidth={containerSize} mt={10} mb={10}>
        <Global />
        <App />
      </Container>
      <Theme.Button />
    </Theme>
  </ChakraProvider>
);
