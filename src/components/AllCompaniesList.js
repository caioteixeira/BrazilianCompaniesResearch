import React, {useState} from "react"
import CompanyCell from "./CompanyCell"

import { SimpleGrid, Stack, Center, Button } from "@chakra-ui/react"


const AllCompaniesList = (props) => {
  const [currentPage, setCurrentPage] = useState(1)
  const companiesPerPage = 12

  const ceil = Math.ceil(companiesPerPage * currentPage, props.allCompanies.length)

  const allCompanies = props.allCompanies.slice(0,ceil)

  const onLoadMoreClick = (data) => {
    setCurrentPage(currentPage + 1)
  }

  return (
    <Stack spacing="20px">
      <SimpleGrid minChildWidth="15em" spacing="20px">
        {allCompanies.map(( node ) => (
          <CompanyCell key={node.id} shortTicker={node.shortTicker} name={node.name} />
        ))}
      </SimpleGrid>
      <Center>
        <Button variant="link" colorScheme="blue"
          onClick={onLoadMoreClick}>
          Ver mais empresas
        </Button>
      </Center>
    </Stack>
  )
}

export default AllCompaniesList