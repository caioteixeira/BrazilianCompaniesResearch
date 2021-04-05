import React from "react"
import {
  Stack,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react"

const AccountTable = (props) => {
    if(props.account === undefined) {
      return ( <></> )
    }

    const code = props.account.accountCode
    const description = props.account.accountDescripton
    const values = Object.entries(props.account.data)
  
    return (
      <>
        <Heading as="h2" size="md">{code} - {description}</Heading>
        <Table>
          <Thead>
            <Th>Ano</Th>
            <Th>Valor</Th>
          </Thead>
          <Tbody>
            {
              values.map(value => 
                <Tr key={value[0]}>
                  <Td>{value[0]}</Td>
                  <Td>{value[1].value}</Td>
                </Tr>
              )
            }
          </Tbody>
        </Table>
        
      </>
    )
  }
  
  const AccountList = (props) => {
    const dfp = props.dfp
    if(!dfp) {
      return ( <p>Loading...</p>)
    }

    const accounts = [dfp.revenue, dfp.financialResult, dfp.profit]
  
    return (
      <Stack spacing="2">
        {
          accounts.map(account => 
            <AccountTable key={account.accountCode} account={account}/>
          )
        }
      </Stack>
    )
  }

  export default AccountList