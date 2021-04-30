import React from "react"
import { graphql } from "gatsby"
import AllCompaniesList from "../components/AllCompaniesList"
import Layout from "../components/Layout"
import { Container, Box } from "@chakra-ui/layout"

export default function Home({ data }) {
  const nodes = data.allDataJson.edges.map(({ node }) => node)

  return (
    <Layout>
      <Container centerContent maxW="6xl">
        <Box width="100%" paddingY="4">
          <AllCompaniesList allCompanies={nodes} />
        </Box>
      </Container>
    </Layout>
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
  }
`
