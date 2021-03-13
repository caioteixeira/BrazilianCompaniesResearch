import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"


export default function CompanyPage({data}) {
  const companyData = data.dataJson
  const [dfp, setDfp] = useState({})

  useEffect(() => {
    fetch(`../data/${companyData.id}.json`)
    .then(response => response.json())
    .then(json => {
      console.log(json)
      setDfp(json)
    })
  }, [])

  return (
    <div>
      <h1>{companyData.name}</h1>
      <p>{companyData.cnpj}</p>
      <p>{JSON.stringify(dfp)}</p>
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