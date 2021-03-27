import React from "react"
import { Link } from "gatsby"
import Logo from "./Logo"

const CompanyCell = (props) => {
  const ticker = props.shortTicker;
  const name = props.name;

  return (
    <Link to={ticker} 
      className="bg-white rounded-2xl shadow-lg p-2 m-2
                  border-4 border-opacity-0 border-gray-100
                  hover:border-blue-200 hover:border-opacity-75">

      <Logo ticker={ticker} name={props.name} size={40}></Logo>  

      <p className="text-xl text-center">
        {ticker}
      </p>
      <p className="text-sm text-gray-400 text-center">
        {name}
      </p>
    </Link>
  )
}

export default CompanyCell