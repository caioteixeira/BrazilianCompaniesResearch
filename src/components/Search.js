import React, { useState } from 'react'
import { useFlexSearch } from 'react-use-flexsearch'
import { useStaticQuery, graphql, Link, navigate } from "gatsby"
import { useCombobox } from 'downshift'

import { Box, Input, Stack, LinkBox, LinkOverlay, Heading, 
          Modal, ModalOverlay, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@chakra-ui/react"
import Logo from "./Logo"


const ItemsList = (props) => {

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
    onSelectedItemChange: ({selectedItem }) => {
      if (!selectedItem ) {
        return
      }

      navigate(`../${selectedItem.ticker}`)
    }
  })

  return (
    <>
      <Box {...getComboboxProps()}>
        <Input ref={initialRef} placeholder="Pesquisar empresas" 
            bgColor="white" shadow="lg" {...getInputProps()} />
      </Box>
      <Stack {...getMenuProps()}>
        {isOpen && results.map(( node, index ) => (
            <LinkBox key={node.id} 
                bgColor={index === highlightedIndex ? "gray.100" : "white"}
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
}

const Search = () => {
  const initialRef = React.useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Stack>
        <Input bgColor="white" shadow="lg" 
          placeholder="Pesquisar empresas" onClick={onOpen}/>
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