import { Route, Routes } from 'react-router-dom';
import MainRoutes from './AllRoutes/MainRoutes';
import './App.css';
import ProfileDetails from './components/ProfileDetails';
import LandingPage from './components/LandingPage';
import { useState } from 'react';

function App() {
  const [isLandingPage, setIsLandingPage] = useState(false);
  const [dataToPass, setDataToPass] = useState(null);

  const handleLog = () => {
    setIsLandingPage(false); // Update isLandingPage to true 
  };
  let pass={}
  const passdata = (pass) => {
    setDataToPass(pass);
  };
  return (
    <div className="App">
      {/* Conditional rendering in Landing and other pages */}
      {isLandingPage?<ProfileDetails handleLog={handleLog} passdata={passdata} pass={pass}><MainRoutes dataToPass={dataToPass}/></ProfileDetails>:<Routes>
      
      <Route exact path="/"
      element={
        <LandingPage setIsLandingPage={setIsLandingPage} />}/>
</Routes>}     
    </div>
  );
}

export default App;
