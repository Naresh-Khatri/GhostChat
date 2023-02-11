import {
  Avatar,
  Box,
  Flex,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import { Confession } from '../supabase/useConfessions'

function ConfessionsList({ confessions }: { confessions: Confession[] }) {
  const timestamp = `${new Date(
    confessions[0].created_at
  ).toLocaleTimeString()} ${new Date(
    confessions[0].created_at
  ).toLocaleDateString()}`
  const bgColor = useColorModeValue('gray.50', 'gray.700')
  return (
    <Flex>
      <List w={'100%'}>
        {confessions.map((confession) => (
          <ListItem
            bg={bgColor}
            borderRadius={12}
            my={2}
            p={5}
            width='100%'
            key={confession.id}
          >
            <Flex>
              <Flex direction='column' align={'center'}>
                <Avatar />
                <Text
                  mt={2}
                  align={'center'}
                  fontWeight={'light'}
                  fontSize={'sm'}
                  color={'gray.500'}
                >
                  {timestamp}
                </Text>
              </Flex>
              <Text pl={2} fontWeight={'extrabold'}>
                {confession.text}
              </Text>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Flex>
  )
}

export default ConfessionsList
