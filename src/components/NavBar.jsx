import { useContext, useState } from "react";
import { navLinks } from "../Constants/index";
import LoginButton from "./LoginButton";
import { GlobalContext } from "./context/GlobalState";
import { GlobalUserContext } from "./context/UsersContext";

const NavBar = () => {
  const [active, setActive] = useState("");
  const { toggle, setToggle } = useContext(GlobalContext);
  const { currentUser } = useContext(GlobalUserContext);

  // const userPicture = currentUser?.picture?.data?.url;
  const username = currentUser?.name;

  return (
    <nav
      className={`w-full flex items-center py-3 fixed top-0 z-20 bg-slate-900`}
    >
      <div className="w-full flex justify-between items-center px-3 md:px-20">
        <div
          to="/"
          className="flex flex-row items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5FBzQzUTCG-dkWe3wY38lY-h_SnGp5h6f-w&usqp=CAU"
            }
            alt="picture"
            className="rounded-full w-12 min-w-12"
          />
          <p className="text-white text-[18px] sm:text-sm md:text-[14px] font-bold cursor-pointer flex">
            {username ? username : "ImagesHub"} &nbsp;
          </p>
        </div>

        <div className="flex flex-row gap-5 block md:hidden">
          <LoginButton />

          <button
            className="text-white flex items-center justify-center h-10 w-10 hover:pointer "
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-pink-700  hover:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        <ul className="list-none flex flex-row gap-10 md:flex hidden ">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
          <LoginButton />
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
