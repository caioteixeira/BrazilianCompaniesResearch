import { Box, Center } from "@chakra-ui/layout"
import { Spinner } from "@chakra-ui/react"
import React from "react"
import { Line } from 'react-chartjs-2'

const AccountChart = (props) => {
  const years = props.years

  const mapData = function(account) {
    const data = []
    years.forEach(year => {
      if (!("data" in account)) {
        data.push(0);
        return;
      }
    
      if(!(year in account.data)) {
        data.push(0);
        return;
      }

      let value = account.data[year].value
      value -= value % 1000
      value /= 1000
      data.push(value)
    });

    return data
  }

  const revenue = mapData(props.account)

  console.log(years)

  const data = {
      labels: years,
      datasets: [
          {
              label: props.label,
              data: revenue,
              borderColor: props.color,
              fill:false
          },
      ],
  }

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  return (
    <Box align='center'>
      <Box maxWidth='4xl'>
        <Line data={data} options={options}/>
      </Box>
    </Box>      
  )
}
  
const RevenueChart = (props) => {
  const dfp = props.dfp
  if(!dfp) {
    return ( <Center><Spinner/></Center> )
  }

  const years = Object.entries(dfp.revenue.data)
                      .map(value => value[0])

  return (
    <>
      <AccountChart account={dfp.revenue} label="Receita" color="rgb(255, 99, 50)" years={years}/>
      <AccountChart account={dfp.profit} label="Lucro" color="rgb(10, 99, 132)" years={years}/>
    </>      
  )
}

export default RevenueChart