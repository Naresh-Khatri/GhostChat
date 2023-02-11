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
} from '@chakra-ui/react'
import { AddIcon, ChevronRightIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import NLink from 'next/link'
import supabase from '../supabase/supabase'
import AccountSettingsModal from './AccountSettingsModal'
import { User } from '../supabase/useUser'

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
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>
            <Text fontWeight={'extrabold'} fontSize='1.25em'>
              placeholder
            </Text>
          </Box>

          {!user ? (
            <NLink href='/signup'>
              <Button rightIcon={<ChevronRightIcon />} colorScheme={'green'}>
                Create your link
              </Button>
            </NLink>
          ) : (
            <Flex alignItems={'center'}>
              <Stack direction={'row'} spacing={7}>
                <Button onClick={toggleColorMode}>
                  {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>

                <Box>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={'full'}
                      variant={'link'}
                      cursor={'pointer'}
                      minW={0}
                    >
                      <Avatar size={'sm'} src={''} />
                    </MenuButton>
                    <MenuList alignItems={'center'}>
                      <br />
                      <Center>
                        <Avatar size={'2xl'} src={''} />
                      </Center>
                      <br />
                      <Center>
                        <p>{user.full_name}</p>
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
