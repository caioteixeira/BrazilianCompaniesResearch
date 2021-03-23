import React from "react"
import { Link, graphql } from "gatsby"


export default function Home( {data} ) {
  return (
    <div>
      <h1>Hello world!</h1>
      {data.allDataJson.edges.map(({ node }) => (
        <div key={node.id}>
          <Link to={node.shortTicker}>
            <button>
              {node.shortTicker} - {node.name}
            </button>
          </Link>
        </div>
      ))}
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