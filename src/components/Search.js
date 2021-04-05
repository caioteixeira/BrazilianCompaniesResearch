import React, { useState } from 'react'
import { useFlexSearch } from 'react-use-flexsearch'
import { useStaticQuery, graphql, Link } from "gatsby"
import { Input, Stack, LinkBox, LinkOverlay, Heading } from "@chakra-ui/react"
import Logo from "./Logo"


const ResultsList = (props) => {
  const results = props.results

  if(results.length === 0) {
    return (<></>)
  }

  return (
    <Stack>
      {results.map(( node ) => (
          <LinkBox key={node.id} shortTicker={node.ticker} name={node.name}>
            <Stack direction="row" alignContent="center">
              <Logo ticker={node.ticker} name={`${node.ticker} logo`} size={10}></Logo>  
              <Heading size="md">
                <Link to={`../${node.ticker}`}>
                  <LinkOverlay>{node.name}</LinkOverlay>
                </Link>
              </Heading> 
            </Stack>
          </LinkBox>
        ))}
    </Stack>
  )
}

const Search = (props) => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      localSearchPages {
        index
        store
      }
    }
  `)

  const index = data.localSearchPages.index;
  const store = data.localSearchPages.store;

  const [query, setQuery] = useState("")
  const results = useFlexSearch(query, index, store, { limit: 5 })

  const onQueryChange = (event) => {
    setQuery(event.target.value)
  }

  return (
    <Stack>
      <Input placeholder="Pesquisar empresas" onChange={onQueryChange}/>
      <ResultsList results={results}/>
    </Stack>
  )
}

export default Search