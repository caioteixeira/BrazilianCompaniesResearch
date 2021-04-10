import React from "react"
import Logo from "./Logo"
import { Center, Heading, Text, Stack, Badge } from "@chakra-ui/react"

const CompanyHeader = (props) => {
  const name = props.name
  const cnpj = props.cnpj
  const ticker = props.shortTicker
  const tickers = props.tickers;

  return (
    <div>
      <Center>
        <Stack align="center">
          <Logo ticker={ticker} name={name} size={40}></Logo>  
          <Heading as="h1" size='lg' color="blue.700">{name} - {ticker}</Heading>
          <Text>{cnpj}</Text>

          <Stack direction="row">
            {
              tickers.map(ticker => 
                <Badge key={ticker} colorScheme="blue">{ticker}</Badge>
              )
            }
          </Stack>

        </Stack>
      </Center>      
    </div>
  )
}

export default CompanyHeader