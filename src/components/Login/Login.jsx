import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "admin" && password === "123456") {
      try {
        const response = await axios.post("http://localhost:3001/login", {
          username: username,
          password: password,
        });

        const newToken = response.data.token;
        localStorage.setItem("token", newToken);
        navigate("/");
      } catch (error) {
        console.error("Login failed:", error);
      }
    } else {
      setModalOpen(true);
      setTimeout(() => {
        setModalOpen(false);
      }, 1500);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen relative z-0">
      <div className="flex flex-col shadow-custom bg-gradient-to-br from-white to-gray-200 rounded-3xl p-[2rem] text-center w-[22rem] h-[30rem]">
        <div className="flex justify-center items-center mx-auto border-2 rounded-full w-40 h-40">
          <FaUser size={100} color="gray" />
        </div>
        <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
          <div className="bg-blue-100 rounded-lg flex items-center pl-2">
            <FaUser size={20} color="gray" />
            <input
              type="text"
              placeholder="username"
              className="p-3 bg-blue-100 w-full outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="bg-blue-100 rounded-lg flex items-center pl-2 mt-7 mb-10">
            <RiLockPasswordFill size={20} color="gray" />
            <input
              type="password"
              placeholder="password"
              className="p-3 bg-blue-100 w-full outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="bg-blue-500 p-3 rounded-lg text-white font-semibold tracking-wider hover:bg-blue-600 hover:transition-all duration-300">
            Login
          </button>
        </form>
      </div>
      <div
        className={`absolute left-[50%] -translate-x-1/2 -translate-y-1/2 flex justify-center items-center shadow-custom bg-white rounded-3xl w-[30rem] h-60 transition-all duration-500
      ${modalOpen ? "top-[50%] z-10" : "-top-64 z-0"}`}
      >
        <p className="text-lg tracking-wide text-red-600">
          Username or password is wrong!
        </p>
      </div>
    </div>
  );
};

export default Login;
