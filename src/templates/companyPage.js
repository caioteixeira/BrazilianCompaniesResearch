import React, { useEffect, useState, useCallback } from "react"
import { graphql } from "gatsby"
import AccountList from "../components/AccountList"
import DfpTable from "../components/DfpTable"

export default function CompanyPage({data}) {
  const companyData = data.dataJson
  const [dfp, setDfp] = useState(null)

  useEffect(() => {
    fetch(`../data/${companyData.id}.json`)
        .then(response => response.json())
        .then(json => setDfp(json))
  }, [])

  return (
    <div>
      <h1 class="text-lg text-center font-bold text-indigo-700">{companyData.name}</h1>
      <p class="text-center text-indigo-600">{companyData.cnpj}</p>
      <DfpTable dfp={dfp}/>
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