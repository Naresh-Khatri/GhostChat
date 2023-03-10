import {
  Avatar,
  Divider,
  Flex,
  Grid,
  GridItem,
  IconButton,
  List,
  ListItem,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { FaShare } from 'react-icons/fa'
import { Confession } from '../supabase/useConfessions'
import SimpleCard from './SimpleCard'
import ShareConfessionModal from './ShareConfessionModal'
import { useState } from 'react'

function ConfessionsList({ confessions }: { confessions: Confession[] }) {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [selectedConfession, setSelectedConfession] =
    useState<Confession | null>({
      text: '',
      id: '',
      created_at: '',
      to_user: '',
    })
  const textColor = useColorModeValue('gray.700', 'gray.100')
  const formatDateTime = (date: string) => {
    const formattedTime = `${new Date(date).getHours()}:${new Date(
      date
    ).getMinutes()}`
    const formattedDate = new Date(date).toDateString()
    return { time: formattedTime, date: formattedDate }
  }

  if (confessions.length === 0)
    return (
      <>
        <Flex
          border={'2px dashed grey'}
          borderRadius={10}
          h={150}
          align={'center'}
          justify={'center'}
        >
          <Text fontWeight={'extrabold'}>No Confessions yet!</Text>
        </Flex>
      </>
    )
  const handleShareMessage = (confession: Confession) => {
    setSelectedConfession(confession)
    onOpen()
  }
  return (
    <Flex>
      <ShareConfessionModal
        isOpen={isOpen}
        onClose={onClose}
        confession={selectedConfession}
      />
      <List w={'100%'}>
        {confessions.map((confession) => (
          <ListItem key={confession.id}>
            <SimpleCard maxW='100%'>
              <IconButton
                position={'absolute'}
                right={3}
                bottom={3}
                size={'sm'}
                color={textColor}
                aria-label='share message'
                icon={<FaShare />}
                onClick={() => handleShareMessage(confession)}
              />
              <Grid
                templateColumns={'repeat(5, 1fr)'}
                gap={3}
                onClick={() => handleShareMessage(confession)}
              >
                <GridItem colSpan={1}>
                  <Flex direction={'column'} align={'center'}>
                    <Avatar />
                    <Text
                      mt={2}
                      align={'center'}
                      fontWeight={'light'}
                      fontSize={'md'}
                      color={'gray.300'}
                    >
                      {formatDateTime(confession.created_at).time}
                    </Text>
                    <Text
                      align={'center'}
                      fontWeight={'light'}
                      fontSize={12}
                      color={'gray.500'}
                    >
                      {formatDateTime(confession.created_at).date}
                    </Text>
                  </Flex>
                </GridItem>
                <GridItem colSpan={4}>
                  <Flex w={'100%'}>
                    <Divider orientation='vertical' h={'100'} />
                    <Flex justify={'center'} align={'center'} w={'100%'}>
                      <Text
                        pl={2}
                        fontWeight={'extrabold'}
                        w={'100%'}
                        align={'center'}
                        color={textColor}
                      >
                        {confession.text}
                      </Text>
                    </Flex>
                  </Flex>
                </GridItem>
              </Grid>
            </SimpleCard>
          </ListItem>
        ))}
      </List>
    </Flex>
  )
}

export default ConfessionsList
