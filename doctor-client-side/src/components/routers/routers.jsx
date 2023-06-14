import { createBrowserRouter } from "react-router-dom";
import DashboardLayOut from "../../Layout/DashboardLayOut";
import MainLayout from "../../Layout/MainLayout";
import ApointmentPage from "../Pages/ApointMentPages/ApointmentPage/ApointmentPage";
import EditProfile from "../Pages/EditProfile/EditProfile";
import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Profile from "../Pages/Profile/Profile";
import Register from "../Pages/Register/Register";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import AllUsers from "../Dashboard/AllUsers/AllUsers" ;
import Dashboard from "../Dashboard/Dashboard/Dashboard";
import AdminRoute from "../PrivateRouter/AdminRoute";
import AddDoctor from "../Pages/AddDoctor/AddDoctor";
import Payment from "../Pages/Pyment/Pyment" ;
import ManageDoctors from "../Pages/MangeDoctors/ManageDoctors/ManageDoctors";
import DisplayError from "../Share/DisplayError/DisplayError";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import UpdateUser from "../Pages/UpdateUser/UpdateUser";
import Contact from "../Pages/Contact/Contact";
import About from "../Pages/About/About";
import Privacy from "../Pages/Privacy/Privacy";
import UpdateDoctor from "../Pages/MangeDoctors/UpdateDoctor/UpdateDoctor";
import VideoCallHome from "../Pages/Pages/VideoCallHome/VideoCallHome";
import VideoCallRoom from "../Pages/Pages/VideoCallRoom/VideoCallRoom";
import ChatPage from "../Pages/Pages/ChatPage/ChatPage";
import ChatLogin from "../Pages/Pages/ChatPage/ChatLogin";
export  const routers = createBrowserRouter([
{
    path:"/" , element:<MainLayout></MainLayout> ,
    errorElement:<DisplayError></DisplayError>
    , children:[
        {
            path:"/" , element:<Home></Home>
        } ,
        {
            path:"/apointment" , element : <PrivateRouter><ApointmentPage></ApointmentPage></PrivateRouter>
        }
        , 
        {
            path:"/login" , element:<Login></Login>
        }, 
        {
            path:"/register" , element:<Register></Register>
        }
        ,
        {
            path:"/videoCall" , element:<VideoCallHome></VideoCallHome>
        }
        ,
        {
            path:"/videoRoom/:roomId/:name" , element:<VideoCallRoom></VideoCallRoom>
        }
        ,
        {
            path:"/profile" , element: <PrivateRouter><Profile></Profile></PrivateRouter>
        } , 
        {
            path:'/reset-password' , element:<PrivateRouter><ForgotPassword></ForgotPassword></PrivateRouter>
        } ,
        {
            path:"/edit-profile" , element:<PrivateRouter><EditProfile></EditProfile></PrivateRouter>
        }
        , 
        {
         path:"/contact" , element : <Contact></Contact>
        }
        ,{
            path:"/about" , element:<About></About>
        }
        
        ,
        {
            path:"/privacy" , element:<Privacy></Privacy>
        }
        ,
        {
            path:"/chat" , element:<ChatLogin></ChatLogin>
        },
        {
            path:"/chatRoom/:userId/:username" , element:<ChatPage></ChatPage>
        }
        
        ,
        {
            path:"*" , element:<ErrorPage></ErrorPage>
        }

    ]
    
} ,

//dashboard nested routers 
{
path:"/dashboard" , element: <PrivateRouter><DashboardLayOut></DashboardLayOut></PrivateRouter> ,
errorElement:<DisplayError></DisplayError>
,children: [
{
path:"/dashboard/" , element: <PrivateRouter><Dashboard></Dashboard></PrivateRouter>
} ,
{
path:"/dashboard/all-users" , element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
}, 
{
path:"/dashboard/add-doctor" , element: <AdminRoute><AddDoctor></AddDoctor></AdminRoute>
} ,
{
path:"/dashboard/manage-doctors" , element: <AdminRoute> <ManageDoctors></ManageDoctors> </AdminRoute>
} , 
{
    path:"/dashboard/payment/:id" , 
    loader : async ({params}) =>
     fetch(`https://use-me.vercel.app/bookingsInformation/${params.id}` , {
      headers:{
        authorization:`Bearer ${localStorage.getItem("doctors-portal")}`
      }
     })
    , element:<Payment></Payment>
}
, 
{
    path:"/dashboard/update-user-information/:id" , 
    loader:async ({params}) =>
     fetch(`https://use-me.vercel.app/users/${params.id}` ,{
        method:"GET" ,
        headers:{
            authorization:`Bearer ${localStorage.getItem("doctors-portal")}`
          } 
     }) ,
    element: <AdminRoute><UpdateUser></UpdateUser></AdminRoute>
}
,
{
    path:"/dashboard/update-doctor/:id" , 
    loader:async ({params}) => fetch(`https://use-me.vercel.app/doctors/${params.id}` , {
        method:"GET" ,
        headers:{
            authorization:`Bearer ${localStorage.getItem("doctors-portal")}`
          }  
    })
     ,
    element:<AdminRoute> <UpdateDoctor></UpdateDoctor> </AdminRoute>
}
, {
    path:"*" , element:<ErrorPage></ErrorPage>
}

]

}
//end dashboard nested routers 

]) 
//
