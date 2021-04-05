import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import CompanyHeader from "../components/CompanyHeader"
import AccountList from "../components/AccountList"
import DfpTable from "../components/DfpTable"
import Search from "../components/Search"
import { Stack, Container, Box } from "@chakra-ui/react"

export default function CompanyPage({data}) {
  const companyData = data.dataJson
  const [dfp, setDfp] = useState(null)

  useEffect(() => {
    import(`/static/data/${companyData.id}.json`)
      .then(json => {
        console.log(json)
        setDfp(json)
      });
  }, [companyData.id])

  return (
    <Container centerContent maxW="4xl">
      <Box padding="4" maxW="4xl">
      <Search/>

      <Stack align='center' spacing="5" padding="5">
        <CompanyHeader shortTicker={companyData.shortTicker} name={companyData.name} cnpj={companyData.cnpj}/>
        <DfpTable dfp={dfp}/>
        <AccountList dfp={dfp}/>
      </Stack>
      </Box>
    </Container>
  )
}

export const query = graphql`
  query($slug: String!) {
    dataJson(fields: { slug: { eq: $slug } }) {
      id
      name
      cnpj
      shortTicker
    }
  }
`