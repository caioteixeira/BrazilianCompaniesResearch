import React from "react"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react"

const DfpValue = ({year, data}) => {
  if(!(year in data)) {
    return (
      <>-</>
    )
  }

  // Scale to millions
  let value = data[year].value
  value -= value % 1000;
  value /= 1000;
  
  return (
    <>
    {value}
    </>
  )
}
  
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
            <Th>EBIT</Th>
            <Th>Caixa</Th>
            <Th>Dívida de longo prazo</Th>
            <Th>Dívida de curto prazo</Th>
          </Thead>
          <Tbody>
            {
              years.map(year => 
                <Tr key={year}>
                  <Td>{year}</Td>
                  <Td><DfpValue data={dfp.revenue.data} year={year}/></Td>
                  <Td><DfpValue data={dfp.financialResult.data} year={year}/></Td>
                  <Td><DfpValue data={dfp.profit.data} year={year}/></Td>
                  <Td><DfpValue data={dfp.ebit.data} year={year}/></Td>
                  <Td><DfpValue data={dfp.cash.data} year={year}/></Td>
                  <Td><DfpValue data={dfp.longTermDebt.data} year={year}/></Td>
                  <Td><DfpValue data={dfp.shortTermDebt.data} year={year}/></Td>
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