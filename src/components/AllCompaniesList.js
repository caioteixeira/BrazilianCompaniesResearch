import React, {useState} from "react"
import CompanyCell from "./CompanyCell"
import ReactPaginate from 'react-paginate'

const AllCompaniesList = (props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const companiesPerPage = 12;

  const pageCount = props.allCompanies.length / companiesPerPage;
  const floor = companiesPerPage * currentPage;
  const ceil = Math.ceil(floor + companiesPerPage, props.allCompanies.length);

  const allCompanies = props.allCompanies.slice(floor,ceil);

  const onPageClick = (data) => {
    console.log(data);
    setCurrentPage(data.selected);
  }

  return (
    <>
      <h1 className="text-center text-4xl">Empresas listadas na B3</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 justify-center py-4">
        {allCompanies.map(( node ) => (
          <CompanyCell key={node.id} shortTicker={node.shortTicker} name={node.name} />
        ))}
      </div>
      
      <ReactPaginate
          previousLabel={'<'}
          nextClassName={'p-2 mx-1 text-blue-800 shadow hover:bg-blue-300 rounded-md text-xl h-10 w-10 text-center'}
          previousClassName={'p-2 mx-1 text-blue-800 shadow hover:bg-blue-300 rounded-md text-xl h-10 w-10 text-center'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'p-2'}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={onPageClick}
          pageClassName={'p-2 mx-1 shadow hover:bg-blue-200 rounded-md text-xl h-10 w-10 text-center'}
          containerClassName={'mx-auto flex justify-center'}
          activeClassName={'active bg-blue-200 bg-opacity-75 inline-block font-semibold'}
        />
    </>
  )
}

export default AllCompaniesList