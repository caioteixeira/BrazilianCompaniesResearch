import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import dfpService from "../services/DfpService"
import AccountList from "../components/AccountList"

export default function CompanyPage({data}) {
  const companyData = data.dataJson
  const [dfp, setDfp] = useState({})

  useEffect(() => {
    dfpService.get(companyData.id)
      .then(dfp => setDfp(dfp))
  }, [])

  return (
    <div>
      <h1 class="text-lg text-center font-bold text-indigo-700">{companyData.name}</h1>
      <p class="text-center text-indigo-600">{companyData.cnpj}</p>
      <AccountList dfp={dfp}/>
    </div>
  )
}

export const query = graphql`
  query($slug: String!) {
    dataJson(fields: { slug: { eq: $slug } }) {
      id
      name
      cnpj
    }
  }
`