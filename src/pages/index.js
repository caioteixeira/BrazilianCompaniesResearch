import React from "react"
import { graphql } from "gatsby"
import AllCompaniesList from "../components/AllCompaniesList"
import Search from "../components/Search"

import { Container, Box, Stack } from "@chakra-ui/react"


export default function Home( {data} ) {
  
  const nodes = data.allDataJson.edges.map(({node}) => node)

  return (
    <Container centerContent maxW="4xl">
      <Box padding="4" maxW="4xl">
        <Stack spacing="5">
        <Search/>
        <AllCompaniesList allCompanies={nodes} />
        </Stack>
      </Box>
    </Container>
  )
}

export const query = graphql`
  query {
      allDataJson {
        edges {
          node {
            name
            shortTicker
          }
        }
      }
    }`