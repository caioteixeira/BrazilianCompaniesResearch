import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import CompanyHeader from "../components/CompanyHeader"
import DfpTable from "../components/DfpTable"
import Layout from "../components/Layout"
import { Box } from "@chakra-ui/react"

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
    <Layout>
      <Box align='center' spacing="5">
        <CompanyHeader shortTicker={companyData.shortTicker} name={companyData.name} cnpj={companyData.cnpj}/>
      </Box>
      <DfpTable dfp={dfp}/>

    </Layout>
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