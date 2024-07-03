import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    //Login Api Call
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-cover" style={{ backgroundImage: 'url(https://img.freepik.com/premium-photo/pencil-checking-off-golden-todo-list-with-copy-space-dark-background_671359-98.jpg)' }}>
        <div className="relative w-96 border rounded-lg bg-white bg-opacity-90 px-7 py-10 shadow-xl">
        
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7 text-center font-semibold text-gray-900">Login</h4>

            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-box w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
             
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
           
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300">
              Login
            </button>

            <p className="text-sm text-center mt-4">
              Not registerd yet?{" "}
              <Link to="/signUp" className="font-medium text-indigo-600 underline">
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    
    </>
  );
};

export default Login;
