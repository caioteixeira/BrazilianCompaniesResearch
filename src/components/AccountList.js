import React from "react"

const AccountTable = (props) => {
    const code = props.account.accountCode
    const description = props.account.accountDescripton
    const values = Object.entries(props.account.data)
  
    return (
      <div>
        <p class="text-lg text-center font-bold m-5">{code} - {description}</p>
        <table class="rounded-t-lg m-5 w-5/6 mx-auto bg-gray-200 text-gray-800">
          <tr class="text-left border-b-2 border-gray-300">
            <th class="px-4 py-3">Ano</th>
            <th class="px-4 py-3">Valor</th>
          </tr>
          {
            values.map(value => 
              <tr key={value[0]} class="bg-gray-100 border-b border-gray-200">
                <td class="px-4 py-3">{value[0]}</td>
                <td class="px-4 py-3">{value[1].value}</td>
              </tr>
            )
          }
        </table>
        
      </div>
    )
  }
  
  const AccountList = (props) => {
    const accounts = Object.entries(props.dfp).map(entry => entry[1])
  
    return (
      <div>
        {
          accounts.map(account => 
            <AccountTable key={account.accountCode} account={account}/>
          )
        }
      </div>
    )
  }

  export default AccountList