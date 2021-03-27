import React from "react"

const Logo = (props) => {
  const name = props.name
  const ticker = props.ticker
  const size = props.size

  return (
    <img src={`/logos/${ticker}.gif`} alt={name} 
            class={`object-scale-down mx-auto h-${size}`}></img>  
  )
}

export default Logo