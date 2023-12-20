import { Link, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { AiOutlineUnlock } from "react-icons/ai";
import { AiOutlineLock } from "react-icons/ai";
import { useState } from "react";
import { register } from "../utils/network";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  function handleUser(event) {
    setName(event.target.value);
  }

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  function handleConfirm(event) {
    setConfirmPassword(event.target.value);
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Password tidak sama");
      return;
    }

    register({ name, email, password, confirmPassword }).then((response) => {
      if (!response.error) {
        alert("Success! Please login");
        console.log(`Successfully created a new account! username: ${name} `);
        navigate("/Login");
      } else {
        alert("Failed to create an account!");
      }
    });
  };

  return (
    <div>
      <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
        <h1 className="text-3xl text-white font-bold text-center mb-6">
          Register
        </h1>
        <form onSubmit={onSubmitHandler}>
          <div className="relative my-6 ">
            <input
              type="text"
              className="block w-72 py-2.3 px-0 text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-teal-400 focus:outline-none focus:ring-0 focus:text-white peer"
              placeholder=""
              value={name}
              onChange={handleUser}
            />
            <label
              htmlFor=""
              className="absolute text-md text-white duration-300 transform -translate-y-6 scale-75 left-3 top-0 z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-400 peer-focus:dark:text-teal-300 peer-placeholder-shown:scale-95 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Your Name
            </label>
            <BiUser className="absolute top-1 right-4" />
          </div>
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
              className="absolute text-md text-white duration-300 transform -translate-y-6 scale-75 left-3 top-0 z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-400 peer-focus:dark:text-teal-300 peer-placeholder-shown:scale-95 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Your Password
            </label>
            <AiOutlineUnlock className="absolute top-1 right-4" />
          </div>
          <div className="relative my-6 ">
            <input
              type="password"
              className="block w-72 py-2.3 px-0 text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-teal-400 focus:outline-none focus:ring-0 focus:text-white peer"
              placeholder=""
              value={confirmPassword}
              onChange={handleConfirm}
            />
            <label
              htmlFor=""
              className="absolute text-md text-white duration-300 transform -translate-y-6 scale-75 left-3 top-0 z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-400 peer-focus:dark:text-teal-300 peer-placeholder-shown:scale-95 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Your Confirm Password
            </label>
            <AiOutlineLock className="absolute top-1 right-4" />
          </div>
          <button
            className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text text-emerald-800 hover:bg-teal-700 cursor-pointer hover:text-white py-2 transition-colors duration-300"
            type="submit"
          >
            Register
          </button>
          <div className="ml-5">
            <span className="m-4">
              Already have Account?
              <Link
                className="text-teal-400 hover:underline hover:text-teal-300"
                to="/Login"
              >
                {" "}
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
