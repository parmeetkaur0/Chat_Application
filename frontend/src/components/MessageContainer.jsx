import SendInput from './SendInput';
import Messages from './Messages';
import { useSelector, useDispatch } from "react-redux";
import { setSelectedUser } from '../redux/userSlice';

const MessageContainer = () => {
    const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const isOnline = onlineUsers?.includes(selectedUser?._id);

    return (
        <>
            {selectedUser !== null ? (
                <div className='bg-white text-black dark:bg-gray-900 dark:text-white w-full md:min-w-[550px] flex flex-col'>

                    <div className='flex w-full items-center gap-2  dark:text-white text-black border border-gray-800 px-3 py-2 mb-2'>

                        <div className={`avatar ${isOnline ? 'online' : ''}`}>
                            <div className='w-12 rounded-full'>
                                <img src={selectedUser?.profilePhoto} alt="user-profile" />
                            </div>
                        </div>

                        <div className='flex flex-col flex-1'>
                            <div className='flex justify-between'>
                                <p>{selectedUser?.fullName}</p>
                            </div>
                        </div>
                        
                        <button
                            onClick={() => dispatch(setSelectedUser(null))}
                            className=" flex items-center bg-white text-black border border-gray-600 justify-center h-10 w-[80px]  rounded-[3px] text-sm font-medium "
                        >
                            <svg
                                className="mr-2 ml-2 text-[20px] transition-all duration-400 ease-in hover:text-[1.2em] hover:translate-x-[-5px]"
                                height="16"
                                width="16"
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.1"
                                viewBox="0 0 1024 1024"
                            >
                                <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
                            </svg>
                            <span >Back</span>
                        </button>

                    </div>

                    <Messages />
                    <SendInput />
                </div>
            ) : (
                <div className='w-full md:min-w-[550px] flex flex-col justify-center items-center flex-1'>
                    <h1 className='text-4xl text-black dark:text-white font-bold'>Hi, {authUser?.fullName}</h1>
                    <h1 className='text-2xl text-black dark:text-white'>Let's start a conversation</h1>
                </div>
            )}
        </>
    );
};

export default MessageContainer;
