import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box,Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import UserCard from './UserCard';

function LandingPage({setIsLandingPage}) {
  const [users, setUsers] = useState([]);
  let navigate = useNavigate();
      const GotoProfile = () =>{ 
          let path = `/profilepage`; 
          navigate(path);
        }
  const handleUserCardClick = () => {
    // Set isLoading to true
    setIsLandingPage(true);
    GotoProfile()
  };

  useEffect(() => {
    // Fetched user data from the API endpoint
    axios.get('https://panorbit.in/api/users.json')
      .then((response) => {
        // Updated the state with the fetched user data
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <Box
      boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
      borderRadius="20px"
      width="35%"
      m="auto"
      mt="100px"
    >
      <Box borderTopLeftRadius="20px" borderTopRightRadius="20px" bg="#f7fafc" p="8">
        <Heading size="md">Select an Account</Heading>
      </Box>
      <Box
        m="auto"
        ml="20px"
        mr="10px"
        overflowY="auto"
        maxHeight="400px"
        width="auto"
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
        {/* All users data is mapped */}
        {users.map((user) => (
          <UserCard key={user.id} user={user} onClick={handleUserCardClick}/>
        ))}
      </Box>
    </Box>
  );
}

export default LandingPage;
