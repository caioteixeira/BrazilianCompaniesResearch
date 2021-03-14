import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import AccountList from "../components/AccountList"

export default function CompanyPage({data}) {
  const companyData = data.dataJson
  const [dfp, setDfp] = useState({})

  useEffect(() => {
    fetch(`../data/${companyData.id}.json`)
    .then(response => response.json())
    .then(json => {
      console.log(json)
      setDfp(json.dfp)
    })
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