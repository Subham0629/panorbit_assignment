import { Box,Image,Text,Divider ,Flex} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import './ProfilePage.css'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import axios from 'axios';

const ProfilePage = ({dataToPass }) => {
  
    const [user, setuser] = useState(JSON.parse(localStorage.getItem('selectedUser')));
    const [data, setdata] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    let lat=user.address.geo.lat
    let lng=user.address.geo.lng
    const apiKey ="AIzaSyAYoTtvkb3ItTqo8Lb81FVHYtkrFNRJ7pE"
    const mapSrc = `https ://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${lat},${lng}&zoom=15`;
    const toggleChatbox = () => {
        setIsOpen(!isOpen);
      };
      const handleUserClick = (user) => {
        // Set the selected user when a user is clicked
        setSelectedUser(user);
      };
      const closeSubChatbox=()=>{
        setSelectedUser(null)
      }
      const getUsers=()=>{
        axios.get('https://panorbit.in/api/users.json')
          .then((response) => {
            // Update the state with the fetched user data
            setdata (response.data.users);
          })
          .catch((error) => {
            console.error('Error fetching user data :', error);
          });
    }
    useEffect(() => {
        // Fetch user data from the API endpoint
        if(dataToPass){
           setuser(dataToPass)
        }
       
        getUsers()
      }, [dataToPass]);
 console.log(user.name)
  return (
    <div>
      <Box display="flex" p="10">
        <Box w="40%"  >
          <Box>
          <Image boxSize="160px"
            objectFit="cover"
            borderRadius="full"
            mx="auto"
            src={user?.profilepicture}></Image>
            <Text>{user?.name}</Text>
          </Box>
       <Box display={"flex"} gap={"10px"} ml={"60px"}  mt={"10px"} >
       <Box textAlign={"right"} w={"50%"} color={"gray"} fontSize={"20px"}>
           <Text>Username :</Text>
            <Text>e-mail :</Text>
            <Text>Phone :</Text>
            <Text>Website :</Text>
            </Box>
            <Box textAlign={"left"} fontWeight={"bold"} color={"gray.700"} fontSize={"16px"}>
            <Text>{user.username}</Text>
            <Text>{user.email}</Text>
            <Text>{user.phone}</Text>
            <Text>{user.website}</Text>
            
            </Box>
        </Box>
        <Divider borderColor="gray.300" borderWidth="1px" mt="4" mb="4"/>
        <Text >Company</Text>
        <Box display={"flex"} gap={"10px"} mt={"10px"} ml={"50px"}>
          <Box textAlign={"right"} w={"50%"} color={"gray"} fontSize={"18px"}>
          
            <Text>Name : </Text>
            <Text>catchphrase : </Text>
            <Text>bs : </Text>
          </Box>
          <Box textAlign={"left"} fontWeight={"bold"} color={"gray.700"} fontSize={"18px"}> 
            <Text>{user?.company.name}</Text>
            <Text>{user.company.catchphrase}</Text>
            <Text>{user.company.bs}</Text>
          </Box>
        </Box>
       
       </Box>
          
        <Divider orientation="vertical" height="auto" borderColor="gray" mx="10" />
        <Box width="60%" ml="30px" textAlign="left" >

            <Text >Address : </Text>
            <Box display={"flex"} gap={"20px"} ml={"20px"} mt={"20px"}>
            <Box textAlign={"right"} color={"gray"} fontSize={"20px"}>
            <Text>Street : </Text>
            <Text>Suite : </Text>
            <Text>City : </Text>
            <Text>Zipcode : </Text>
            </Box>
            <Box textAlign={"left"} fontWeight={"bold"} color={"gray.700"} fontSize={"20px"}>
            <Text>{user.address.street}</Text>
            <Text>{user.address.suite}</Text>
            <Text>{user.address.city}</Text>
            <Text>{user.address.zipcode}</Text>
            </Box>
            </Box>
            
            <Box 
      width="80%"
      height="300px"
      mt="20px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <iframe
       style={{ borderRadius : "10px" }} 
       frameborder="0"
        title="Map"
        width="100%"
        height="100%"
        src={mapSrc}
        allowFullScreen
      ></iframe>
    </Box>
    <Box display="flex" gap="15px" w="80%" justifyContent="flex-end">
    <Text>Lat : {lat}</Text>
    <Text>Long : {lng}</Text>
    </Box>
    
    
        </Box>
        <Box className={`popup-logo ${isOpen ? 'open'  : ''}`} onClick={toggleChatbox} 
        bg="blue.600" w="295px" h="50px" 
        borderTopLeftRadius="10px"
        borderTopRightRadius="10px"
        textAlign="left"
        pl="20px"
        color="white"
        fontWeight="bold"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        cursor="pointer"
        >
            Chats
            <Box pr="20px"  display={{ base : 'none', md : 'flex' }}>
                  <FiChevronUp fontSize={"20px"} />
                </Box>
       
      </Box>
      {/* Chatbox */}
      {selectedUser && isOpen && (<Box>
            <Box className="sub-chatbox"
              //p="10px"
              
              borderBottom="none"
              borderTopLeftRadius="10px"
              borderTopRightRadius="10px"
              bg="white"
              border="1px solid #007BFF"
            >
                <Box 
        bg="blue.600" w="100%" h="50px" 
        borderTopLeftRadius="10px"
        borderTopRightRadius="10px"
        textAlign="left"
        color="white"
        fontWeight="bold"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        cursor="pointer"
        
        >
            <Flex w="100%" direction="row" align="center" justifyContent="space-between" >
                <Box display="flex">
                <Image
                  src={selectedUser.profilepicture}
                  alt={selectedUser.name}
                  boxSize="30px"
                  objectFit="cover"
                  borderRadius="full"
                  ml="5"
                />
                <Text ml="2">{selectedUser.name}</Text>
                </Box>
                <Box display="flex" mr="20px">
                <FiChevronDown fontSize={"20px"} onClick={closeSubChatbox}/>
                <Text  pl="10px" onClick={toggleChatbox}>X</Text>
                </Box>
                
                
              </Flex>
        </Box>
              
            </Box>
            </Box>
          )}
      {isOpen && (
        <Box className="chatbox-container">
            {/* Selected User Box */}
          
           
            <Box
        m="auto"
        ml="20px"
        mr="10px"
        overflowY="auto"
        maxHeight="100%"
        width="auto"
        // Use the sx prop to customize the scrollbar styles
        sx={{
          '& : :-webkit-scrollbar' : {
            width : '10px',
          },
          '& : :-webkit-scrollbar-thumb' : {
            backgroundColor : 'gray.300', 
            borderRadius : 'full',
          }
        }}
      >
        {data.map((singleuser) => (singleuser.name!==user.name &&
            <Box
      
            borderBottom="1px solid #e2e8f0"
            overflow="hidden"
            p={2}
            m={2}
            maxW="sm"
            cursor="pointer"
            onClick={() => handleUserClick(singleuser)}
            >
            <Flex
       
            direction="row" // Vertically align text
            align="center" // Horizontally align text
            gap="20px"
            justify="flex-start" // Vertically align text
            height="100%" // Ensure the Flex container takes up the entire height of the box
          >
            <Image
              src={singleuser.profilepicture}
              alt={singleuser.name}
              boxSize="30px"
              objectFit="cover"
              borderRadius="full"
              
            />
            <Text color="grey">{singleuser.name}</Text>
            
          </Flex>
          </Box>
        ))}
      </Box>
        </Box>
      )}
      </Box>
    </div>
  )
}

export default ProfilePage
