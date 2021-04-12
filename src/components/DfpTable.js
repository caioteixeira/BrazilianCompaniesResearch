import React from "react"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Center,
  Spinner
} from "@chakra-ui/react"

const DfpValue = ({year, account}) => {

  if (!("data" in account)) {
    return (
      <>-</>
    )
  }

  const data = account.data
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
    return ( <Center><Spinner/></Center> )
  }

  const years = Object.entries(dfp.revenue.data)
                      .map(value => value[0])

  return (
    <Box align="center" padding="5">
      {
        <Table variant="simple" shadow="lg" maxWidth="4xl">
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
                  <Td><DfpValue account={dfp.revenue} year={year}/></Td>
                  <Td><DfpValue account={dfp.financialResult} year={year}/></Td>
                  <Td><DfpValue account={dfp.profit} year={year}/></Td>
                  <Td><DfpValue account={dfp.ebit} year={year}/></Td>
                  <Td><DfpValue account={dfp.cash} year={year}/></Td>
                  <Td><DfpValue account={dfp.longTermDebt} year={year}/></Td>
                  <Td><DfpValue account={dfp.shortTermDebt} year={year}/></Td>
                </Tr>
              )
            }
          </Tbody>
          
        </Table>
      }
    </Box>
  )
}

export default DfpTable