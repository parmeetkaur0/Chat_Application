import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from '../redux/userSlice';
import { clearNotificationFromUser } from "../redux/notificationSlice";

const OtherUser = ({ user, notifications = [], onUserSelect = () => { } }) => {
    const dispatch = useDispatch();
    const { selectedUser, onlineUsers } = useSelector(store => store.user);

    const isOnline = onlineUsers?.includes(user._id);
    const notificationCount = notifications.filter(n => n.senderId === user._id).length;

    const selectedUserHandler = () => {
        onUserSelect(user);  // <-- Parent handler
        dispatch(setSelectedUser(user));
        dispatch(clearNotificationFromUser(user._id));
    };

    return (
        <>
            <div
                onClick={selectedUserHandler}
                className={`relative flex items-center gap-2 rounded p-2 cursor-pointer ${selectedUser?._id === user?._id
                        ? 'bg-gray-200 border border-gray-900 text-black dark:bg-gray-600 dark:text-white dark:border-none'
                        : 'text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                style={{ overflow: 'visible' }} 
            >
                <div className={`avatar ${isOnline ? 'online' : ''}`}>
                    <div className='w-12 rounded-full'>
                        <img src={user?.profilePhoto} alt="user-profile" />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <p>{user?.fullName}</p>
                </div>

                {notificationCount > 0 && (
                    <div className="absolute right-0 top-0 z-10">
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full shadow-md">
                            {notificationCount}
                        </span>
                    </div>
                )}

            </div>
            <div className='divider my-0 py-0 h-1'></div>
        </>
    );
};

export default OtherUser;
