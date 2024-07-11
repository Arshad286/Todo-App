import React, { useState, useEffect } from "react";
import ProfileInfo from "../Cards/profile-info";
import SearchBar from "../SearchBar/search-bar";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ userInfo, onSearchTodo, handleClearSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setsearchQuery] = useState("");

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      onSearchTodo(searchQuery);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    setsearchQuery(e.target.value);
  };

  const onClearSearch = () => {
    setsearchQuery("");
    handleClearSearch();
  };

  const isLoginOrSignupPage = location.pathname === '/login' || location.pathname === '/signUp';
  

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-black py-2 text-xl font-medium">Todo</h2>
 
    {!isLoginOrSignupPage && (
      <SearchBar
        value={searchQuery}
        onChange={({ target }) => {
          setsearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
          )}


      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
