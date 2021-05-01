import React from "react"
import Logo from "./Logo"
import { Center, Heading, Text, Stack, Badge } from "@chakra-ui/react"

const CompanyHeader = ({ name, cnpj, shortTicker, tickers, logoPath }) => {
  return (
    <div>
      <Center>
        <Stack align="center">
          <Logo logoPath={logoPath} name={name} size={40}></Logo>
          <Heading as="h1" size="lg" color="blue.700">
            {name} - {shortTicker}
          </Heading>
          <Text>{cnpj}</Text>

          <Stack direction="row">
            {tickers.map(shortTicker => (
              <Badge key={shortTicker} colorScheme="blue">
                {shortTicker}
              </Badge>
            ))}
          </Stack>
        </Stack>
      </Center>
    </div>
  )
}

export default CompanyHeader
