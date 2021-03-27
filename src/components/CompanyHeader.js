import React from "react"
import Logo from "./Logo"

const CompanyHeader = (props) => {
  const name = props.name;
  const cnpj = props.cnpj;
  const ticker = props.shortTicker;

  return (
    <div>
      <Logo ticker={ticker} name={name} size={24}></Logo>  
      <h1 class="text-lg text-center font-bold text-indigo-700">{name} - {ticker}</h1>
      <p class="text-center text-indigo-600">{cnpj}</p>
    </div>
  )
}

export default CompanyHeader