import React from "react"
import { Image, Center } from "@chakra-ui/react"

const Logo = props => {
  const name = props.name
  const logoPath = props.logoPath
  const size = props.size

  return (
    <Center>
      <Image src={`/logos/${logoPath}`} alt={`${name} logo`} boxSize={size} />
    </Center>
  )
}

export default Logo
