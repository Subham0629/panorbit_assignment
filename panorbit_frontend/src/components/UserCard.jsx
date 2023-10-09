// UserCard.js

import React from 'react';
import { Box, Image, Text,Flex } from '@chakra-ui/react';
import {  useNavigate } from 'react-router-dom';

function UserCard({ user, onClick }) {
    let navigate = useNavigate();
    const GotoProfile = () =>{ 
        let path = `/profilepage`; 
        navigate(path);
      }

    const handleViewProfile = (user) => {
    // Stored the selected user's data in local storage
    localStorage.setItem('selectedUser', JSON.stringify(user));
    onClick();
    GotoProfile()
  };
  return (
    <Box
      
      borderBottom="1px solid #e2e8f0"
      overflow="hidden"
      p={2}
      m={2}
      maxW="sm"
      cursor="pointer"
      onClick={() => handleViewProfile(user)}
    >
      <Flex
       
        direction="row" 
        align="center" 
        gap="20px"
        justify="flex-start" 
        height="100%">
        <Image
          src={user.profilepicture}
          alt={user.name}
          boxSize="30px"
          objectFit="cover"
          borderRadius="full"
          
        />
        <Text color="grey">{user.name}</Text>
      </Flex>
    </Box>
  );
}

export default UserCard;
