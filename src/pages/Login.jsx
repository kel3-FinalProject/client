import { Link } from "react-router-dom";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { AiOutlineUnlock } from "react-icons/ai";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  return (
    <div>
      <div className="bg-slate-700 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
        <h1 className="text-3xl text-white font-bold text-center mb-6">
          Login
        </h1>
        <form action="">
          <div className="relative my-6 ">
            <input
              type="email"
              className="block w-72 py-2.3 px-0 text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-teal-400 focus:outline-none focus:ring-0 focus:text-white peer"
              placeholder=""
              value={email}
              onChange={handleEmail}
            />
            <label
              htmlFor=""
              className="absolute text-md text-white duration-300 transform -translate-y-6 scale-75 left-3 top-0 z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-400 peer-focus:dark:text-teal-300 peer-placeholder-shown:scale-95 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Your Email
            </label>
            <MdOutlineAlternateEmail className="absolute top-1 right-4" />
          </div>
          <div className="relative my-6 ">
            <input
              type="password"
              className="block w-72 py-2.3 px-0 text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-teal-400 focus:outline-none focus:ring-0 focus:text-white peer"
              placeholder=""
              value={password}
              onChange={handlePassword}
            />
            <label
              htmlFor=""
              className="absolute text-md text-white duration-300 transform -translate-y-6 scale-75 left-3 -top-0 z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-400 peer-focus:dark:text-teal-300 peer-placeholder-shown:scale-95 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Your Password
            </label>
            <AiOutlineUnlock className="absolute top-1 right-4" />
          </div>
          <button
            className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text text-emerald-800 hover:bg-teal-700 hover:text-white py-2 transition-colors duration-300"
            type="submit"
          >
            Login
          </button>
          <div className="ml-6">
            <span className="m-4">
              New Here?
              <Link
                className="text-teal-400 hover:underline hover:text-teal-300"
                to="/Register"
              >
                {" "}
                Create an Account
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
