import React from "react"
import CompanyCell from "./CompanyCell"

const AllCompaniesList = (props) => {
  const allCompanies = props.allCompanies.slice(0,32);

  return (
    <>
      <h1 className="text-center text-4xl">Empresas listadas na B3</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 justify-center py-4">
        {allCompanies.map(( node ) => (
          <CompanyCell key={node.id} shortTicker={node.shortTicker} name={node.name} />
        ))}
      </div>
    </>
  )
}

export default AllCompaniesList