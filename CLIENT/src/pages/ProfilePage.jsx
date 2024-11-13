import React from 'react';
import Sidebar from '../components/Sidebar';
import Profile from '../components/Profile';

const ProfilePage = () => {
  return (
    <div className="flex">

      <div className="w-[80px]">
        <Sidebar />
      </div>


      <div className="p-4 flex-1">
        <div className='bg-[#f3f4f6] rounded-xl h-[97vh] p-4'>
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
