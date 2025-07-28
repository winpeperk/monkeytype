import { ChakraProvider  } from '@chakra-ui/react'
import { createRoot } from "react-dom/client";
import App from "./App";
import Theme from './Theme';
import "./index.css";

createRoot(document.getElementById("root")).render(
    <ChakraProvider>
      <Theme>
        <App/>
        <Theme.Button/>
      </Theme>
    </ChakraProvider>
);
