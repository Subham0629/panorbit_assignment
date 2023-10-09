// Routes.js

import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Posts from '../Pages/Posts';
import ProfilePage from '../Pages/ProfilePage';
import Gallery from '../Pages/Gallery';
import ToDo from '../Pages/ToDo';

function MainRoutes({dataToPass}) {

  return (
    <Routes>
        <Route exact path="/profilepage" element={<ProfilePage dataToPass={dataToPass}/>} />
        <Route exact path="/posts" element={<Posts/>} />
        <Route exact path="/gallery" element={<Gallery/>} />
        <Route exact path="/todo" element={<ToDo/>} />
    </Routes>
    
  );
}

export default MainRoutes;
