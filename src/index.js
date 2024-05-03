import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { ChakraProvider, theme } from '@chakra-ui/react';
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}
const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* <ChakraProvider > */}
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    {/* </ChakraProvider> */}
  </Provider>
);