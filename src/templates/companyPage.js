import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import { Box, Text } from "@chakra-ui/react"

import Layout from "../components/Layout"
import CompanyHeader from "../components/CompanyHeader"
import DfpTable from "../components/DfpTable"
import RevenueChart from "../components/RevenueChart"

export default function CompanyPage({ data }) {
  const companyData = data.dataJson
  const [dfp, setDfp] = useState(null)

  useEffect(() => {
    import(`/static/data/${companyData.id}.json`).then(json => {
      console.log(json)
      setDfp(json)
    })
  }, [companyData.id])

  return (
    <Layout>
      <Box align="center" spacing="5" paddingY="4">
        <CompanyHeader
          name={companyData.name}
          cnpj={companyData.cnpj}
          shortTicker={companyData.shortTicker}
          tickers={companyData.tickers}
        />
      </Box>
      <Text textAlign="center">
        Todos os valores são representados em milhões de reais
      </Text>
      <DfpTable dfp={dfp} />
      <RevenueChart dfp={dfp} />
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
      tickers
    }
  }
`
