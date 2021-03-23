import React from "react"
import { Link, graphql } from "gatsby"


export default function Home( {data} ) {
  return (
    <div class="bg-blue-200 p-6">
      <div class="bg-white rounded-xl shadow-md mx-auto container p-6">
        <h1 class="text-center text-3xl">Empresas listadas na B3</h1>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 py-4">
          {data.allDataJson.edges.map(({ node }) => (
            <div key={node.id} class="p-2">
              <Link to={node.shortTicker}>
                <p class="text-lg">
                  {node.shortTicker}
                </p>
                <p class="text-sm text-gray-400">
                  {node.name}
                </p>
              </Link>
            </div>
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