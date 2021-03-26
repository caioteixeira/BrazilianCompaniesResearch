import React from "react"
  
const DfpTable = (props) => {
  const dfp = props.dfp
  if(!dfp) {
    return ( <p>Loading...</p>)
  }

  const years = Object.entries(dfp.revenue.data)
                      .map(value => value[0])

  return (
    <div>
      {
        <table class="rounded-t-lg m-5 w-5/6 mx-auto bg-gray-100 text-gray-800">
          <tr class="text-left border-b-2 border-gray-300">
            <th class="bg-gray-600 text-gray-100 rounded-tl-lg px-4 py-3">Ano</th>
            <th class="bg-green-200 px-4 py-3">Receita</th>
            <th class="bg-green-200 px-4 py-3">Res. Financeiro</th>
            <th class="bg-green-200 rounded-tr-lg px-4 py-3">Lucro Líquido</th>
          </tr>
          
          {
            years.map(year => 
              <tr key={year} class="bg-gray-100 border-b-2 border-gray-200">
                <td class="bg-gray-600 text-gray-100 px-4 py-3">{year}</td>
                <td class="px-4 py-3">{dfp.revenue.data[year].value}</td>
                <td class="px-4 py-3">{dfp.financialResult.data[year].value}</td>
                <td class="px-4 py-3">{dfp.profit.data[year].value}</td>
              </tr>
            )
          }
          
        </table>
      }
    </div>
  )
}

export default DfpTable