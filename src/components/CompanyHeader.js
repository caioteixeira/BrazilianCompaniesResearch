import React from "react"
import Logo from "./Logo"
import { Center, Heading, Text, Stack } from "@chakra-ui/react"

const CompanyHeader = (props) => {
  const name = props.name
  const cnpj = props.cnpj
  const ticker = props.shortTicker

  return (
    <div>
      <Center>
        <Stack align="center">
          <Logo ticker={ticker} name={name} size={24}></Logo>  
          <Heading as="h1" size='lg' color="purple.700">{name} - {ticker}</Heading>
          <Text>{cnpj}</Text>
        </Stack>
      </Center>      
    </div>
  )
}

export default CompanyHeader