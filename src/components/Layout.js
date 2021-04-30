import React from "react"
import Search from "../components/Search"

import { Container, Box } from "@chakra-ui/react"

const Layout = ({ children }) => {
  return (
    <>
      <Box background="blue.500" shadow="lg">
        <Container centerContent maxW="6xl">
          <Box width="100%" padding="3">
            <Search />
          </Box>
        </Container>
      </Box>

      {children}
    </>
  )
}

export default Layout
