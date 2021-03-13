import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"

const AccountTable = (props) => {
  const description = props.account.accountDescripton
  const values = Object.entries(props.account.data)

  return (
    <div>
      <p>{description}</p>
      <table>
        <tr>
          <th>Ano</th>
          <th>Valor</th>
        </tr>
        {
          values.map(value => 
            <tr key={value[0]}>
              <td>{value[0]}</td>
              <td>{value[1].value}</td>
            </tr>
          )
        }
      </table>
      
    </div>
  )
}

const AccountList = (props) => {
  const accounts = Object.entries(props.dfp).map(entry => entry[1])

  return (
    <div>
      {
        accounts.map(account => 
          <AccountTable key={account.accountCode} account={account}/>
        )
      }
    </div>
  )
}

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
      <h1>{companyData.name}</h1>
      <p>{companyData.cnpj}</p>
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