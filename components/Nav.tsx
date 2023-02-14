import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  useToast,
  Text,
  HStack,
  IconButton,
} from '@chakra-ui/react'
import { AddIcon, ChevronRightIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import NLink from 'next/link'
import supabase from '../supabase/supabase'
import AccountSettingsModal from './AccountSettingsModal'
import { User } from '../supabase/useUser'
import Image from 'next/image'
import Logo from './Logo'

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}
  >
    {children}
  </Link>
)

interface NavProps {
  user?: User
}
export default function Nav({ user }: NavProps) {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const toast = useToast()
  const router = useRouter()

  const handleLogoutClick = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast({
        title: 'An error occurred.',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      return
    }
    router.push('/')
  }

  return (
    <>
      <Box
        bg={useColorModeValue('rgba(255,255,255,.6)', 'rgba(0,0,0,.6)')}
        backdropFilter='auto'
        backdropBlur='2px'
        px={4}
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack align={'center'}>
            <Logo size={40} />
            <Text fontWeight={'extrabold'} fontSize='1.25em'>
              GhostChat
            </Text>
          </HStack>

          {!user ? (
            <NLink href='/signup'>
              <Button rightIcon={<ChevronRightIcon />} colorScheme={'blue'}>
                Create your link
              </Button>
            </NLink>
          ) : (
            <Flex alignItems={'center'}>
              <Stack direction={'row'} spacing={7}>
                <IconButton
                  aria-label='Toggle dark mode'
                  rounded={'full'}
                  icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                  onClick={toggleColorMode}
                ></IconButton>

                <Box>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={'full'}
                      variant={'link'}
                      cursor={'pointer'}
                      minW={0}
                    >
                      <Image
                        aria-label='User avatar'
                        alt='User avatar'
                        src={user.avatar_url || ''}
                        width={40}
                        height={40}
                        style={{ borderRadius: '50%' }}
                      />
                    </MenuButton>

                    <MenuList alignItems={'center'}>
                      <br />
                      <Center>
                        <Image
                          aria-label='User avatar'
                          alt='User avatar'
                          src={user.avatar_url || ''}
                          width={150}
                          height={150}
                          style={{ borderRadius: '50%' }}
                        />
                      </Center>
                      <br />
                      <Center flexDirection={'column'}>
                        <Text as={'p'}>{user.full_name}</Text>
                        <Text as={'p'} fontSize={'sm'} color={'gray.400'}>
                          @{user.username}
                        </Text>
                      </Center>
                      <br />
                      <MenuDivider />
                      <MenuItem onClick={onOpen}>Account Settings</MenuItem>
                      <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              </Stack>
            </Flex>
          )}
        </Flex>
        <AccountSettingsModal isOpen={isOpen} onClose={onClose} />
      </Box>
    </>
  )
}
