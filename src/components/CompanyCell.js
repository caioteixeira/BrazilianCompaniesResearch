import React from "react"
import { Link } from "gatsby"

const CompanyCell = (props) => {
  const ticker = props.shortTicker;
  const name = props.name;

  return (
    <Link to={ticker} 
      className="bg-gray-100 hover:bg-blue-200 hover:bg-opacity-75 rounded-2xl shadow p-4 m-2">

      <img src={`/logos/${ticker}.gif`} alt={props.name} className="object-scale-down mx-auto h-48"></img>

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