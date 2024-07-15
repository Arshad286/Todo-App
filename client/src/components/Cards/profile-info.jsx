import React from "react";

const ProfileInfo = ({ onLogout }) => {
  return (
    <>
      <button 
      className="bg-blue-500 hover:bg-red-500 text-white font-bold py-2 px-4 rounded transition duration-300"
      onClick={onLogout}>
        Logout
      </button>
    </>
  );
};

export default ProfileInfo;
