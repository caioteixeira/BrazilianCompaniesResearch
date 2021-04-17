import React, { useState } from 'react'
import { useFlexSearch } from 'react-use-flexsearch'
import { useStaticQuery, graphql, Link } from "gatsby"
import { Input, Stack, LinkBox, LinkOverlay, Heading, 
          Modal, ModalOverlay, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@chakra-ui/react"
import Logo from "./Logo"


const ResultsList = (props) => {
  const results = props.results

  if(results.length === 0) {
    return (<></>)
  }

  return (
    <Stack>
      {results.map(( node ) => (
          <LinkBox key={node.id}>
            <Stack direction="row" alignContent="center">
              <Logo ticker={node.ticker} name={`${node.ticker} logo`} size={10}></Logo>  
              <Heading size="md" my="auto">
                <Link to={`../${node.ticker}`}>
                  <LinkOverlay>{node.name}</LinkOverlay>
                </Link>
              </Heading > 
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

  const initialRef = React.useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const index = data.localSearchPages.index;
  const store = data.localSearchPages.store;

  const [query, setQuery] = useState("")
  const results = useFlexSearch(query, index, store, { limit: 5 })

  const onQueryChangeOnModal = (event) => {
    setQuery(event.target.value)
  }

  return (
    <>
      <Stack>
        <Input bgColor="white" shadow="lg" placeholder="Pesquisar empresas" onClick={onOpen}/>
      </Stack>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Input ref={initialRef} 
                  bgColor="white" shadow="lg" placeholder="Pesquisar empresas" onChange={onQueryChangeOnModal}/>
          </ModalHeader>
          <ModalBody pb={6}>
              <ResultsList results={results} query={query}/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Search