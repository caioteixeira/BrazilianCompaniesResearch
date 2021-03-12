import React, { useEffect } from "react"
import { graphql } from "gatsby"


export default function CompanyPage({data}) {
  const companyData = data.dataJson

  return (
    <div>
      <h1>{companyData.name}</h1>
      <p>{companyData.cnpj}</p>
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