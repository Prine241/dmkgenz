import React from "react";
import { motion } from "framer-motion";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="absolute top-0 left-0 w-full h-2 flex">
        <div className="w-2/3 bg-red-600"></div>
        <div className="w-1/3 bg-yellow-400"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-neutral-900 border border-red-900/30 rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-red-600 to-yellow-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
              D
            </div>

            <h1 className="mt-4 text-3xl font-bold text-white">
              DMK GenZ
            </h1>

            <p className="text-gray-400 text-sm mt-2">
              Login to continue
            </p>
          </div>

          <LoginForm />
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;