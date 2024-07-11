import React from 'react';

const Lander = () => {
  return (
<>  
    <div className="bg-amber-950 min-h-screen flex items-center justify-center bg-cover"  >
      <div className="max-w-3xl bg-white bg-opacity-90 p-8 shadow-lg rounded-lg text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to My TODO Application</h1>
        <p className="text-gray-700 text-lg mb-6">
          Manage your tasks efficiently with our powerful TODO application.
        </p>
        <div className="space-y-4">
          <a href="/signup" className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md shadow-md transition duration-300 block">
            Sign Up
          </a>
          <div className="mt-4">
            <a href="/login" className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-md shadow-md transition duration-300 block">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Lander;
