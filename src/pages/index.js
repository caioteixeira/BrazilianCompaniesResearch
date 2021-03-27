import React from "react"
import { graphql } from "gatsby"
import AllCompaniesList from "../components/AllCompaniesList"


export default function Home( {data} ) {
  
  const nodes = data.allDataJson.edges.map(({node}) => node)

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl mx-auto container p-6">
        <AllCompaniesList allCompanies={nodes} />
      </div>
    </div>
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