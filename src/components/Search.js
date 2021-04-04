import React, { useState } from 'react'
import { useFlexSearch } from 'react-use-flexsearch'
import { useStaticQuery, graphql } from "gatsby"
import { Input } from "@chakra-ui/react"


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
    <header>
      <p>{JSON.stringify(results)}</p>
      <Input placeholder="Pesquisar empresas" onChange={onQueryChange}/>
    </header>
  )
}

export default Search