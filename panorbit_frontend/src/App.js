import { Route, Router, Routes ,Switch, useNavigate} from 'react-router-dom';
import MainRoutes from './AllRoutes/MainRoutes';
import './App.css';
import ProfileDetails from './components/ProfileDetails';
import LandingPage from './components/LandingPage';
import { useState } from 'react';
import Posts from './Pages/Posts';
import ProfilePage from './Pages/ProfilePage';

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
      {isLandingPage?<ProfileDetails handleLog={handleLog} passdata={passdata} pass={pass}><MainRoutes dataToPass={dataToPass}/></ProfileDetails>:<Routes>
      
      <Route exact path="/"
      element={
        <LandingPage setIsLandingPage={setIsLandingPage} />}/>
</Routes>}
      
   
   {/* <Routes>
      {isLandingPage ? (
        <Route
          path="/"
          element={<LandingPage onNavigateToProfile={() => setIsLandingPage(false)} />}
        />
      ) : (
        <Route
          path="/profilepage"
          element={<ProfileDetails onNavigateToLandingPage={() => navigate('/')}><MainRoutes/></ProfileDetails>}
        />
      )}
    </Routes> */}

    
      

    

      
    </div>
  );
}

export default App;
