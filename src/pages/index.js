import React from "react"
import { graphql } from "gatsby"
import AllCompaniesList from "../components/AllCompaniesList"
import Search from "../components/Search"


export default function Home( {data} ) {
  
  const nodes = data.allDataJson.edges.map(({node}) => node)

  return (
    <div className="p-6 bg-gray-100">
      <div className="rounded-xl mx-auto container p-6">
        <Search/>
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