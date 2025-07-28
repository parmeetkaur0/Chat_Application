import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setAuthUser } from '../redux/userSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiEdit, FiSave, FiArrowLeft } from 'react-icons/fi';

const ProfilePage = () => {
    const { authUser } = useSelector(store => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [editMode, setEditMode] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({
        fullName: '',
        username: ''
    });

    useEffect(() => {
        if (!authUser) {
            navigate('/login');
        } else {
            setUpdatedUser({
                fullName: authUser.fullName,
                username: authUser.username
            });
        }
    }, [authUser, navigate]);

    const handleUpdate = async () => {
        try {
            const res = await axios.put(`${process.env.BASE_URL}/api/v1/user/updateProfile`, updatedUser, {
                withCredentials: true
            });
            dispatch(setAuthUser(res.data.updatedUser));
            toast.success("Profile updated successfully!");
            setEditMode(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed!");
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 p-6">
            <div className="backdrop-blur-xl bg-white/30 dark:bg-gray-800/40 rounded-3xl shadow-xl border border-gray-300 dark:border-gray-700 p-8 w-full max-w-lg">

                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-black dark:text-white border border-black dark:border-white rounded-md px-4 py-2 text-sm font-medium transition duration-200 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                >
                    <FiArrowLeft className="mr-2 w-4 h-4" />
                    Back
                </button>

                <div className="flex flex-col items-center mt-6">
                    <img
                        src={authUser?.profilePhoto}
                        alt="User"
                        className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md"
                    />
                    {editMode ? (
                        <>
                            <input
                                type="text"
                                value={updatedUser.fullName}
                                onChange={(e) => setUpdatedUser({ ...updatedUser, fullName: e.target.value })}
                                className="mt-4 text-center w-full bg-transparent border-b-2 border-gray-500 focus:outline-none text-2xl font-semibold text-gray-800 dark:text-white"
                            />
                            <input
                                type="text"
                                value={updatedUser.username}
                                onChange={(e) => setUpdatedUser({ ...updatedUser, username: e.target.value })}
                                className="mt-2 text-center w-full bg-transparent border-b-2 border-gray-500 focus:outline-none text-gray-600 dark:text-gray-300"
                            />
                        </>
                    ) : (
                        <>
                            <h2 className="text-3xl font-bold mt-4 text-gray-900 dark:text-white">
                                {authUser?.fullName}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mt-1">@{authUser?.username}</p>
                        </>
                    )}
                </div>

                <div className="mt-8 flex justify-center">
                    {editMode ? (
                        <button
                            onClick={handleUpdate}
                            className="flex items-center gap-2 py-2 px-6 rounded-full bg-green-500 text-white border border-green-600 hover:bg-transparent hover:text-green-500 hover:border-green-500 transition"
                        >
                            <FiSave /> Save
                        </button>
                    ) : (
                        <button
                            onClick={() => setEditMode(true)}
                            className="flex items-center gap-2 py-2 px-6 rounded-full bg-blue-500 text-white border border-blue-600 hover:bg-transparent hover:text-blue-500 hover:border-blue-500 transition"
                        >
                            <FiEdit /> Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
