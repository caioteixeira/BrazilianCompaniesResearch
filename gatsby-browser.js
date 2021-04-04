import './src/styles/global.css';

import React from "react"
import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react"

const customTheme = extendTheme({});
export const wrapRootElement = ({ element }) => {
  return (
    <ChakraProvider theme={customTheme}>
      <CSSReset />
      {element}
    </ChakraProvider>
  )
}