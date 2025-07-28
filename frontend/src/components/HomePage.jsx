import Sidebar from './Sidebar';
import MessageContainer from './MessageContainer';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const { selectedUser } = useSelector(store => store.user);

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white flex h-screen w-screen rounded-lg overflow-hidden">
      <div className="hidden md:flex w-full">
        <Sidebar />
        <MessageContainer />
      </div>

      <div className='flex md:hidden w-full'>
        {!selectedUser ? <Sidebar /> : <MessageContainer className="flex-1" />}
      </div>
    </div>
  );
};

export default HomePage;
