import React, { useState } from "react";
import ProfileInfo from "../Cards/profile-info";
import SearchBar from "../SearchBar/search-bar";
import { useNavigate } from "react-router-dom";


const Navbar = ({userInfo}) => {

  const navigate = useNavigate();
  const [searchQuery, setsearchQuery] = useState("");

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  }

  const handleSearch = () => {

  };

  const onClearSearch = () => {
    setsearchQuery("");
  };


  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-black py-2 text-xl font-medium">Todo</h2>

      <SearchBar
      value={searchQuery}
      onChange={({target}) => {
        setsearchQuery(target.value);
      }}
      handleSearch={handleSearch}
      onClearSearch={onClearSearch}

    
      />

      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
