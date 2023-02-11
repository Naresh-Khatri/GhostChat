import ConfessionsList from '@/components/ConfessionsList';
import Nav from '@/components/Header';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Icon,
  Text,
  useColorModeValue,
  Container,
} from '@chakra-ui/react';

import { FaCopy } from 'react-icons/fa';

const confessions = [
  {
    id: 1,
    text: "I have a fear of the dark and always sleep with a nightlight.", timestamp: "2023-02-08 12:00:00"
  },
  {
    id: 2,
    text: "I have a secret love for karaoke and perform at local bars every weekend.", timestamp: "2023-02-08 12:05:00"
  },
  { id: 3, text: "I have a hidden talent for knitting and have made over 50 scarves for friends and family.", timestamp: "2023-02-08 12:10:00" },
  { id: 4, text: "I have a bad habit of biting my nails when I'm nervous.", timestamp: "2023-02-08 12:15:00" },
  { id: 5, text: "I have a passion for photography and take pictures on every trip I go on.", timestamp: "2023-02-08 12:20:00" },
  { id: 6, text: "I have a love for animals and volunteer at a local animal shelter every Saturday.", timestamp: "2023-02-08 12:25:00" },
  { id: 7, text: "I have a fear of flying and always take a book to read on every flight.", timestamp: "2023-02-08 12:30:00" },
  { id: 8, text: "I have a hidden love for baking and make elaborate cakes for friends and family.", timestamp: "2023-02-08 12:35:00" },
  { id: 9, text: "I have a talent for magic tricks and perform them at family gatherings.", timestamp: "2023 - 02 - 08 12: 40: 00" },
  { id: 10, text: "I have a fear of public speaking and get nervous every time I have to give a presentation.", timestamp: "2023-02-08 12:45:00" }
]




export default function Dashboard() {
  return (
    <>
      <Nav />
      <Container maxW={'6xl'}>
        <Heading fontWeight={'bold'} fontSize={{ base: '2xl', md: '3xl' }}>
          Welcome back DanIsPro!
        </Heading>
        <Flex
          bg={useColorModeValue('gray.50', 'gray.700')}
          mx={{ base: 2, md: 0 }}
          p={10}
          borderRadius={12}
          align={'center'} direction='column'>
          <Text>Copy your link!</Text>
          <Icon as={FaCopy} boxSize={10} />
        </Flex>
        <Heading my={4} fontWeight={'bold'} fontSize={{ base: '2xl', md: '3xl' }}>
          Confessions
        </Heading>
        <ConfessionsList confessions={confessions} />
      </Container>
    </>
  );
}