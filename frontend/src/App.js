import Signup from './components/Signup';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from './components/HomePage';
import Login from './components/Login';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { useEffect} from 'react';
import {useSelector,useDispatch} from "react-redux";
import io from "socket.io-client";
import { setSocket } from './redux/socketSlice';
import { setNotification } from "./redux/notificationSlice";
import { setOnlineUsers } from './redux/userSlice';

const router = createBrowserRouter([
  {
      path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/profile",
    element:<Profile/>
  }

])

function App() { 
  const {authUser} = useSelector(store=>store.user);
  const {socket} = useSelector(store=>store.socket);
  const dispatch = useDispatch();

 

  useEffect(() => {
  if (!authUser) return;

  const socketio = io(`${process.env.REACT_APP_BASE_URL}`, {
    query: {
      userId: authUser._id
    }
  });

  dispatch(setSocket(socketio));

  socketio.on('getOnlineUsers', (onlineUsers) => {
    dispatch(setOnlineUsers(onlineUsers));
  });

  return () => {
    socketio.close();
    dispatch(setSocket(null));
  };

}, [authUser, dispatch]);


  useEffect(() => {
        if (!socket) return;  

        const handleNewMessage = (message) => {
            console.log("Received newMessage via socket:", message);
            dispatch(setNotification(message));
        };

        socket.on('newMessage', handleNewMessage);

        return () => {
            socket.off('newMessage', handleNewMessage);
        };
    }, [socket, dispatch]);

    

  return (
    <div className=" h-screen flex items-center justify-center">
      <RouterProvider router={router}/>
    </div>

  );
}

export default App;
