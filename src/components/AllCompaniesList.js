import React, {useState} from "react"
import CompanyCell from "./CompanyCell"

const AllCompaniesList = (props) => {
  const [currentPage, setCurrentPage] = useState(1)
  const companiesPerPage = 12

  const ceil = Math.ceil(companiesPerPage * currentPage, props.allCompanies.length)

  const allCompanies = props.allCompanies.slice(0,ceil)

  const onLoadMoreClick = (data) => {
    setCurrentPage(currentPage + 1)
  }

  return (
    <>
      <h1 className="text-center text-4xl">Empresas listadas na B3</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 justify-center py-4">
        {allCompanies.map(( node ) => (
          <CompanyCell key={node.id} shortTicker={node.shortTicker} name={node.name} />
        ))}
      </div>
      <div className="mx-auto flex justify-center">
        <button className="text-blue-700 font-semibold hover:text-blue-900 hover:underline py-2 px-4 rounded" 
          onClick={onLoadMoreClick}>
          Ver mais empresas
        </button>
      </div>
    </>
  )
}

export default AllCompaniesList