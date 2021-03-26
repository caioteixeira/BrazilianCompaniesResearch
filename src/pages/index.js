import React from "react"
import { Link, graphql } from "gatsby"
import CompanyCell from "../components/CompanyCell"


export default function Home( {data} ) {
  return (
    <div class="p-6">
      <div class="bg-white rounded-xl mx-auto container p-6">
        <h1 class="text-center text-4xl">Empresas listadas na B3</h1>
        <div class="grid grid-cols-2 md:grid-cols-4 justify-center py-4">
          {data.allDataJson.edges.map(({ node }) => (
            <CompanyCell key={node.id} shortTicker={node.shortTicker} name={node.name} />
          ))}
        </div>
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