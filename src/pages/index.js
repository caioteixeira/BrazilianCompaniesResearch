import React from "react"
import { graphql } from "gatsby"
import AllCompaniesList from "../components/AllCompaniesList"
import Layout from "../components/Layout"

export default function Home( {data} ) {
  
  const nodes = data.allDataJson.edges.map(({node}) => node)

  return (
    <Layout>
      <AllCompaniesList allCompanies={nodes} />
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
    }`