// Routes.js

import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import ProfileDetails from '../components/ProfileDetails'; 
import Posts from '../Pages/Posts';
import ProfilePage from '../Pages/ProfilePage';

function MainRoutes({dataToPass}) {

  return (
    // <ProfileDetails>
    <Routes>
      
        {/* <Route exact path="/" element={<LandingPage/>} /> */}
        
        <Route exact path="/profilepage" element={<ProfilePage dataToPass={dataToPass}/>} />
        <Route exact path="/posts" element={<Posts/>} />
    
    </Routes>
    // </ProfileDetails>
    
  );
}

export default MainRoutes;
