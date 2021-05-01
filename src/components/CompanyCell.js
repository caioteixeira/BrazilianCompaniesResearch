import React from "react"
import { Link } from "gatsby"
import Logo from "./Logo"

import { Center, Box, Stack, Text, Tag } from "@chakra-ui/react"

const CompanyCell = props => {
  const ticker = props.shortTicker
  const name = props.name
  const logoImage = props.logoImage

  return (
    <Center>
      <Box
        as="button"
        w="15em"
        h="100%"
        padding="2"
        lineHeight="1.2"
        transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
        shadow="lg"
        rounded="xl"
        _hover={{ bg: "#ebedf0" }}
        _active={{
          bg: "#dddfe2",
          transform: "scale(0.98)",
          borderColor: "#bec3c9",
        }}
        _focus={{
          boxShadow:
            "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
        }}
      >
        <Link to={ticker}>
          <Stack>
            <Logo logoPath={logoImage} name={props.name} size={40}></Logo>
            <Text textColor="blue.600" fontWeight="semibold" fontSize="md">{name}</Text>
            <Center>
              <Tag>{ticker}</Tag>
            </Center>
          </Stack>
        </Link>
      </Box>
    </Center>
  )
}

export default CompanyCell
