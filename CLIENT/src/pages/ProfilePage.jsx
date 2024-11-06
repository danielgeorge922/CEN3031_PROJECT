import React from 'react';
import Sidebar from '../components/Sidebar';
import Mainscreen from '../components/Mainscreen';

const Mainpage = () => {
  return (
    <div className="flex">

      <div className="w-[80px]">
        <Sidebar />
      </div>


      <div className="flex-1">
        <Profile />
      </div>
    </div>
  );
};

export default Mainpage;
