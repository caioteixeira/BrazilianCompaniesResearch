import React from "react"
import { Image } from "@chakra-ui/react"

const Logo = (props) => {
  const name = props.name
  const ticker = props.ticker
  const size = props.size

  return (
    <>
      <Image src={`/logos/${ticker}.gif`} alt={`${name} logo`} boxSize={size}/>
    </> 
  )
}

export default Logo