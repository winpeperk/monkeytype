import { Container } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Theme from "./components/Theme";
import "./index.css";

const containerSize = {
  base: "100%",
  sm: "90%",
  md: "85%"
};

createRoot(document.getElementById("root")).render(
  <Theme>
    <Container maxWidth={containerSize} my={10} mx="auto" justify="center"> 
      <App />
    </Container>
  </Theme>
);
