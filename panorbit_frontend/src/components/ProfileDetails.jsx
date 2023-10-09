import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Button,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image
} from '@chakra-ui/react'
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import UserCard from './UserCard'



const LinkItems = [
  { name: 'Profile', path: "/profilepage" },
  { name: 'Posts', path: "/posts" },
  { name: 'Gallery', path: "/gallery" },
  { name: 'ToDo' , path: "/todo"},
  
]

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('blue.700')}
      borderRadius="40px"
      pt="10%"
      //borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        {/* <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text> */}
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem borderBottom="1px solid wheat" borderRadius="0px" color="white" 
        key={link.name}
        path={link.path}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

const NavItem = ({ icon, children,path, ...rest }) => {
    const navigate = useNavigate()
  return (
    <Box
    onClick={() => navigate(path)}
      as="a"
     // href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        // _hover={{
        //   bg: 'cyan.400',
        //   color: 'white',
        // }}
        {...rest}>
        {/* {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )} */}
        {children}
      </Flex>
    </Box>
  )
}

  const MobileNav = ({ onOpen,handleLog,passdata, ...rest }) => {
      const [user,setUser]=useState(JSON.parse(localStorage.getItem('selectedUser')))

      const [data,setdata]=useState([])
      let navigate = useNavigate();
      const GotoProfile = () =>{ 
          let path = `/profilepage`; 
          navigate(path);
        }
        const GotoHome = () =>{ 
          let path = `/`; 
          navigate(path);
        }

      const handleClick=(user)=>{
          localStorage.setItem('selectedUser', JSON.stringify(user));
          setUser(JSON.parse(localStorage.getItem('selectedUser')))
          GotoProfile()
          passdata(JSON.parse(localStorage.getItem('selectedUser')))
      }
      const handleLogout=()=>{
          localStorage.removeItem('selectedUser');
          GotoHome()
          handleLog()
      
      }
      const getUsers=()=>{
          axios.get('https://panorbit.in/api/users.json')
            .then((response) => {
              // Update the state with the fetched user data
              setdata (response.data.users);
            })
            .catch((error) => {
              console.error('Error fetching user data:', error);
            });
      }
      useEffect(() => {
          // Fetch user data from the API endpoint
          getUsers()
        }, []);
    return (
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg={useColorModeValue('white', 'gray.900')}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        justifyContent={{ base: 'space-between', md: 'flex-end' }}
        {...rest}>
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />

        {/* <Text
          display={{ base: 'flex', md: 'none' }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold">
          Logo
        </Text> */}

        <HStack spacing={{ base: '0', md: '6' }}>
          {/* <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} /> */}
          <Flex alignItems={'center'} >
            <Menu >
              <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                <HStack >
                  <Avatar
                    size={'sm'}
                    src={
                      user.profilepicture
                    }
                  />
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2">
                    <Text fontSize="sm">{user.name}</Text>
                    
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue('white', 'gray.900')}
                borderColor={useColorModeValue('gray.200', 'gray.700')}>
                  <Avatar
                  mt={"15px"}
                  mb={"10px"}
                    size={'xl'}
                    src={
                      user.profilepicture
                    }
                  />
                  <Text fontSize="md" color="grey">{user.name}</Text>
                  <Text fontSize="sm" color="grey">{user.email}</Text>
                  <Box
          m="auto"
          ml="20px"
          mr="10px"
          overflowY="auto"
          maxHeight="100px"
          width="auto"
          // Use the sx prop to customize the scrollbar styles
          sx={{
            '&::-webkit-scrollbar': {
              width: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'gray.300', 
              borderRadius: 'full',
            }
          }}
        >
          <MenuDivider />
          {data.map((singleuser) => (singleuser.name !==user.name &&<>

              <Flex w="100%" direction="row" align="center"
              onClick={()=>handleClick(singleuser)} 
              cursor="pointer"  >
                  <Image
                    src={singleuser.profilepicture}
                    alt={singleuser.name}
                    boxSize="30px"
                    objectFit="cover"
                    borderRadius="full"
                    ml="5"
                  />
                  <Text ml="2">{singleuser.name}</Text>
                  
                </Flex>
              <MenuDivider /></>
          ))}
        </Box>
              
                <Button mt="15px" mb={"20px"} bg="red.600" color={"white"} borderRadius={"50px"} _hover={{bg:"red.500"}} onClick={handleLogout}>Sign out</Button>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>     
      </Flex>
    )
  }

  const ProfileDetails = ({children,handleLog,passdata}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <Box minH="100vh">
        <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full">
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}
        <MobileNav onOpen={onOpen} handleLog={handleLog} passdata={passdata}/>
        <Box ml={{ base: 0, md: 60 }} p="4">
          {children}
          {/* Content */}
        </Box>
      </Box>
    )
  }

  export default ProfileDetails