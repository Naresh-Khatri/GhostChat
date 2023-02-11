import { Flex, List, ListItem, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

function ConfessionsList({ confessions }) {
  const bgColor = useColorModeValue('gray.50', 'gray.700')
  return (
    <Flex>
      <List w={'100%'}>
        {confessions.map((confession) => (
          <ListItem
            bg={bgColor}
            borderRadius={12}
            my={2}
            px={7}
            py={5}
            width='100%'
            key={confession.id}
          >
            <Text fontWeight={'extrabold'}>{confession.text}</Text>
            <Text fontWeight={'light'} fontSize={'sm'} color={'gray.500'}>
              {confession.timestamp}
            </Text>
          </ListItem>
        ))}
      </List>
    </Flex>
  )
}

export default ConfessionsList
