import React from "react"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react"
  
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
        <Table variant="simple">
          <Thead>
            <Th>Ano</Th>
            <Th>Receita</Th>
            <Th>Res. Financeiro</Th>
            <Th>Lucro Líquido</Th>
          </Thead>
          <Tbody>
            {
              years.map(year => 
                <Tr key={year}>
                  <Td>{year}</Td>
                  <Td>{dfp.revenue.data[year].value}</Td>
                  <Td>{dfp.financialResult.data[year].value}</Td>
                  <Td>{dfp.profit.data[year].value}</Td>
                </Tr>
              )
            }
          </Tbody>
          
        </Table>
      }
    </div>
  )
}

export default DfpTable