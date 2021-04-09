import React from "react"
import { Image, Center } from "@chakra-ui/react"

const Logo = (props) => {
  const name = props.name
  const ticker = props.ticker
  const size = props.size

  return (
    <Center>
      <Image src={`/logos/${ticker}.gif`} alt={`${name} logo`} boxSize={size}/>
    </Center> 
  )
}

export default Logo