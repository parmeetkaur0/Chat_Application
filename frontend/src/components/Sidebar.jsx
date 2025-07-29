import { useState, useEffect } from 'react';
import { BiSearchAlt2 } from "react-icons/bi";
import { FiSun, FiMoon } from "react-icons/fi";
import OtherUsers from './OtherUsers';
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice';
import { clearNotificationFromUser } from '../redux/notificationSlice';
import { AiOutlineClose } from "react-icons/ai"; 

const Sidebar = () => {
    const [search, setSearch] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const { notifications } = useSelector(store => store.notification);
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    const { otherUsers } = useSelector(store => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const onUserSelect = (user) => {
        dispatch(setSelectedUser(user));
        dispatch(clearNotificationFromUser(user._id));
        dispatch(setMessages([]));
    };

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/user/logout`);
            navigate("/login");
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
            dispatch(setMessages(null));
            dispatch(setOtherUsers(null));
            dispatch(setSelectedUser(null));
        } catch (error) {
            console.log(error);
        }
    };

    const ProfileHandler = () => {
        navigate("/profile");
    };

    useEffect(() => {
        setFilteredUsers(otherUsers);
    }, [otherUsers]);

    const searchSubmitHandler = (e) => {
        e.preventDefault();

        if (search.trim() === "") {
            setFilteredUsers(otherUsers);
            return;
        }

        const matchedUsers =  (otherUsers || []).filter((user) =>
            user.fullName.toLowerCase().includes(search.toLowerCase())
        );

        if (matchedUsers.length > 0) {
            setFilteredUsers(matchedUsers);
        } else {
            toast.error("User not found!");
        }
    };

    return (
        <div className='border-r border-slate-500 p-4 flex flex-col'>
            <form onSubmit={searchSubmitHandler} className='w-full flex items-center gap-2'>
                <div className="relative w-full">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='input input-bordered rounded-md bg-gray-100 text-black dark:bg-gray-800 dark:text-white w-full pr-10'
                        type="text"
                        placeholder='Search...'
                    />
                    {search && (
                        <AiOutlineClose
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 dark:text-white text-black cursor-pointer w-5 h-5"
                            onClick={() => {
                                setSearch("");
                                setFilteredUsers(otherUsers);
                            }}
                        />
                    )}
                </div>
                <button type='submit' className='btn hover:bg-gray-200 border-gray-300 dark:bg-gray-800 dark:text-white bg-gray-100 text-black'>
                    <BiSearchAlt2 className='w-6 h-6 outline-none' />
                </button>
            </form>


            <div className="divider px-3"></div>
            <OtherUsers
               users={filteredUsers || []} 
               notifications={notifications || []} 
                onUserSelect={onUserSelect}  
            />

            <div className="divider bottom-10 px-2">
                <div className='mt-2'>
                    <button onClick={logoutHandler} className=" text-black cursor-pointer border border-black rounded-full px-6 py-2 bg-white transition duration-200 hover:bg-black hover:text-white hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_5px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none">
                        Logout
                    </button>
                </div>
                <div className='mt-2'>
                    <button onClick={ProfileHandler} className=" text-black cursor-pointer border border-black rounded-full px-6 py-2 bg-white transition duration-200 hover:bg-black hover:text-white hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_5px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none">
                        Profile
                    </button>
                </div>
                <div className='mt-2'>
                    <button onClick={toggleTheme} className="p-3  text-black hover:bg-black cursor-pointer border border-black rounded-full px-6 py-2 bg-white transition duration-200  hover:text-white hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_5px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none">
                        {theme === 'light' ? <FiMoon className="w-5 h-5" /> : <FiSun className="w-5 h-5" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
