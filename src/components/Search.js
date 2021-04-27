import React, { useState } from 'react'
import { useFlexSearch } from 'react-use-flexsearch'
import { useStaticQuery, graphql, Link, navigate } from "gatsby"
import { useCombobox } from 'downshift'

import { Box, Input, Stack, Heading, 
          Modal, ModalOverlay, ModalBody, ModalContent, 
          useDisclosure } from "@chakra-ui/react"
import Logo from "./Logo"


const ItemsList = React.forwardRef(({children}, ref) => {
  return (
    <Box ref={ref}>
      <Stack >
        {children}
      </Stack>
    </Box>
    
  )
})

const Item = React.forwardRef(({highlighted, node, ...props}, ref) => {
  return (
    <Box key={node.id} ref={ref} {...props}
        bgColor = {highlighted ? "gray.100" : "white"}>
      <Stack direction="row" alignContent="center">
        <Logo ticker={node.ticker} name={`${node.ticker} logo`} size={10} 
            ></Logo>  
        <Heading size="md" my="auto">
          <Link to={`../${node.ticker}`}>
            {node.name}
          </Link>
        </Heading > 
      </Stack>
    </Box>
  )
})

const SearchBox = React.forwardRef((props, ref) => {
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

      props.onSelectItem()
    }
  })

  return (
    <>
      <Box {...getComboboxProps()}>
        <Input ref={ref} placeholder="Pesquisar empresas" 
            bgColor="white" shadow="lg" {...getInputProps()} />
      </Box>
      <ItemsList {...getMenuProps()}>
        {isOpen && results.map(( node, index ) => (
          <Item 
              {...getItemProps({
                node,
                index,
              })}
              key = {index} 
              highlighted = {index === highlightedIndex}
              node = {node}
          >
          </Item>
        ))}
      </ItemsList>
    </>
  )
})

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
        returnFocusOnClose={false}
      >
        <ModalOverlay />
        <ModalContent margin="3">
          <ModalBody pb={6}>
            <SearchBox ref={initialRef} 
              onSelectItem = { () => { 
                onClose()
              }
            }/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Search