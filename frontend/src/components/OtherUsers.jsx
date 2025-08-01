import OtherUser from './OtherUser';
import useGetOtherUsers from '../hooks/useGetOtherUsers';

const OtherUsers = ({ users = [], notifications = [], onUserSelect = () => {} }) => {
    useGetOtherUsers();
    if (!users || users.length === 0) return <p className="text-center text-gray-500 mt-4">No Users Found</p>;

    return (
        <div className='overflow-auto flex-1'>
            {
                users.map((user) => (
                    <OtherUser
                        key={user._id}
                        user={user}
                        notifications={notifications}
                        onUserSelect={onUserSelect}
                    />
                ))
            }
        </div>
    );
};

export default OtherUsers;
