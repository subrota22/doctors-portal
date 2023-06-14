
import './App.css';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { routers } from './components/routers/routers';
import 'react-day-picker/dist/style.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from 'react-spinners/ClipLoader';
import AOS from "aos" ;
function App() {
React.useEffect(() => {
  AOS.init({
    duration:2000, 
    delay:1000
  })
}, []);
  return (
 <React.Fragment>
  <ToastContainer></ToastContainer>
  <RouterProvider router={routers} fallbackElement={
    <>
   <ClipLoader style={{margin:"10% 50%" }} color='textColor'/>
    </>
  }></RouterProvider>
 </React.Fragment>
  );
}

export default App;
