import { Container } from "@chakra-ui/layout"
import React from "react"
import { Line } from 'react-chartjs-2'

  
const RevenueChart = (props) => {
  const dfp = props.dfp
  if(!dfp) {
    return ( <p>Loading...</p>)
  }

  const years = Object.entries(dfp.revenue.data)
                      .map(value => value[0])
  const revenue = []

  years.forEach(year => {
    let value = dfp.revenue.data[year].value
    value -= value % 1000;
    value /= 1000;
    revenue.push(value)
  });

  console.log(years)

  const data = {
      labels: years,
      datasets: [
          {
              label: "Receita",
              data: revenue,
          },
      ],
  }

  console.log(data)

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
    <Container>
        <Line data={data} options={options}/>
    </Container>      
  )
}

export default RevenueChart