import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";

const SignUp = () => {
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [error, SetError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if(!name){
      SetError("Please enter a name");
      return;
    }

    if(!validateEmail(email)){
      SetError("Please enter a valid email address.");
      return;
    }
     
    if(!password){
      SetError("Please enter a password");
      return;
    }

    if(password.length < 6){
      SetError("Password must be at least 6 characters long");
      return;
    }

    SetError("");
  };
  return (
    <>
      <Navbar />

      <div
        className="min-h-screen flex items-center justify-center bg-cover"
        style={{
          backgroundImage:
            "url(https://img.freepik.com/premium-photo/pencil-checking-off-golden-todo-list-with-copy-space-dark-background_671359-98.jpg)",
        }}
      >
        <div className="relative w-96 border rounded-lg bg-white bg-opacity-90 px-7 py-10 shadow-xl">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7 text-center font-semibold text-gray-900">
              SignUp
            </h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box w-full mb-4  px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={name}
              onChange={(e) => SetName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              className="input-box w-full mb-4  px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => SetEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => SetPassword(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button
              type="submit"
              className="btn-primary w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Create Account
            </button>

            <p className="text-sm text-center mt-4">
               Already have an account?
              <Link
                to="/login"
                className="font-medium text-indigo-600 underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
