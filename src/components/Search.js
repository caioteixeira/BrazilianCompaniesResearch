import React, { useState } from 'react'
import { useFlexSearch } from 'react-use-flexsearch'
import { useStaticQuery, graphql, Link } from "gatsby"
import { useCombobox } from 'downshift'

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

const SearchBox = (props) => {
  const initialRef = props.inputRef
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

  const onQueryChangeOnModal = (event) => {
    setQuery(event.target.value)
  }

  const itemToString = item => (item ? item.name : '')
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    getInputProps,
    getComboboxProps,
  } = useCombobox({
    items: results,
    itemToString,
    onInputValueChange: ({ inputValue }) => {
      setQuery(inputValue)
    },
  })

  return (
    <>
      <Input ref={initialRef} bgColor="white" shadow="lg" {...getInputProps()} /> 
      <Stack {...getMenuProps()}>
        {isOpen && results.map(( node, index ) => (
            <LinkBox key={node.id} 
                bgColor={index === highlightedIndex ? "blue" : "white"}
                {...getItemProps({
                  node,
                  index,
                })}>
              <Stack direction="row" alignContent="center">
                <Logo ticker={node.ticker} name={`${node.ticker} logo`} size={10} 
                    ></Logo>  
                <Heading size="md" my="auto">
                  <Link to={`../${node.ticker}`}>
                    <LinkOverlay>{node.name}</LinkOverlay>
                  </Link>
                </Heading > 
              </Stack>
            </LinkBox>
          ))}
      </Stack>
    </>
  )

  /*return (
    <>
      <Input ref={initialRef} bgColor="white" shadow="lg" 
          placeholder="Pesquisar empresas" onChange={onQueryChangeOnModal}/>
      <ResultsList results={results} query={query}/>
    </>
  )*/
}

const Search = () => {
  const initialRef = React.useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Stack>
        <Input bgColor="white" shadow="lg" placeholder="Pesquisar empresas" onClick={onOpen}/>
      </Stack>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        size="6xl"
      >
        <ModalOverlay />
        <ModalContent margin="3">
          <ModalBody pb={6}>
            <SearchBox inputRef={initialRef}/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Search