import React from "react"
import { Image, Center } from "@chakra-ui/react"

const Logo = ({ name, logoPath, size }) => {
  return (
    <Center>
      <Image src={`/logos/${logoPath}`} alt={`${name} logo`} boxSize={size} />
    </Center>
  )
}

export default Logo
