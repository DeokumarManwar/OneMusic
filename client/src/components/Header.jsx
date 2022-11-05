import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Loogo } from "../assets/img";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { FaCrown } from "react-icons/fa";
import { useStateValue } from "../context/StateProvider";
import { app } from "../config/firebase.config";
import { getAuth } from "firebase/auth";
import { motion } from "framer-motion";
import Login from "./Login";
import { actionType } from "../context/reducer";

const Header = () => {
  const [{ user }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);
  const navigate = useNavigate();
  const logOut = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth
      .signOut()
      .then(() => {
        window.localStorage.setItem("auth", "false");
        navigate("/login");
      })
      .catch((e) => {
        console.log(e);
        navigate("/login", { replace: true });
      });
  };
  return (
    <header className="flex items-center w-full p-4 md:py-2 md:px-6 bg-black">
      <NavLink to={"/home"}>
        <img src={Loogo} alt="Logo" className="w-16" />
      </NavLink>

      <ul className="flex items-center  justify-center ml-7 ">
        <li className="mx-5 text-lg  ">
          <NavLink
            to={"/home"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Home
          </NavLink>
        </li>
        <li className="mx-5 text-lg">
          <NavLink
            to={"/search"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Search
          </NavLink>
        </li>
        <li className="mx-5 text-lg">
          <NavLink
            to={"/playlist"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Playlist
          </NavLink>
        </li>
        {user?.user?.role === "member" && (
          <li className="mx-5 text-lg">
            <NavLink
              to={"/premium"}
              className={({ isActive }) =>
                isActive ? isActiveStyles : isNotActiveStyles
              }
            >
              Premium
            </NavLink>
          </li>
        )}
      </ul>

      <div
        onMouseEnter={() => setIsMenu(true)}
        onMouseLeave={() => setIsMenu(false)}
        className="flex items-center ml-auto cursor-pointer gap-2 relative"
      >
        <img
          src={user?.user.imageURL}
          className="w-12 h-12 min-w-[44px] object-cover rounded-full shadow-lg"
          alt=""
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col">
          <p className=" text-lg hover:text-headingColor font-semibold text-gray-200">
            {user?.user?.name}
          </p>
          {user?.user.role === "member" ? (
            ""
          ) : (
            <p className="flex items-center gap-2 text-xs text-grey-500 font-normal text-white">
              Premium Member.
              <FaCrown className="text-sm -ml-1 text-yellow-500" />
            </p>
          )}
        </div>

        {isMenu && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute z-10 top-12 right-0 w-225 p-4 gap-4 bg-card shadow-lg rounded-lg backdrop-blur-sm flex flex-col"
          >
            <NavLink to={"/userProfile"}>
              <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                Profile
              </p>
            </NavLink>
            {/* <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
              My Favourites
            </p> */}
            <hr />

            {user?.user?.role === "admin" && (
              <NavLink to={"/dashboard/home"}>
                <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                  Dashboard
                </p>
              </NavLink>
            )}

            <p
              className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out"
              onClick={logOut}
            >
              Sign out
            </p>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
