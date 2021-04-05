import React from "react"
import Search from "../components/Search"

import { Container, Box, Stack } from "@chakra-ui/react"

const Layout = ({children}) => {
    
    return (
      <Container centerContent maxW="4xl">
        <Box width="100%">
          <Stack spacing="5" padding="5">
            <Search/>
          </Stack>
          {children}
        </Box>
      </Container>
    )
  }

  export default Layout