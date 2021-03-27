import React, { useEffect, useState, useCallback } from "react"
import { graphql } from "gatsby"
import CompanyHeader from "../components/CompanyHeader"
import AccountList from "../components/AccountList"
import DfpTable from "../components/DfpTable"

export default function CompanyPage({data}) {
  const companyData = data.dataJson
  const [dfp, setDfp] = useState(null)

  useEffect(() => {
    import(`/static/data/${companyData.id}.json`)
      .then(json => {
        console.log(json)
        setDfp(json);
      });
  }, [])

  return (
    <div>
      <CompanyHeader shortTicker={companyData.shortTicker} name={companyData.name} cnpj={companyData.cnpj}/>
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
      shortTicker
    }
  }
`