import React, { useState } from "react";
import { Slant as Hamburger } from "hamburger-react";
import { IoSearch } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { FaAnglesRight } from "react-icons/fa6";
import { LuListTodo } from "react-icons/lu";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { RiCheckboxBlankFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";
import { NavLink } from "react-router";

function Sidebar() {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="w-full h-full bg-zinc-200 rounded-xl">
      {/* --- menu heading ---  */}
      <div className="flex justify-between items-center mx-3">
        <h2 className="font-semibold sm:text-2xl lg:text-xl md:text-xl">
          Menu
        </h2>
        <div>
          <Hamburger
            rounded
            direction="right"
            size={20}
            toggled={isOpen}
            toggle={setOpen}
          />
        </div>
      </div>

      {/* --- search filter ---  */}
      <div className="relative mx-3 mt-2">
        <div className="sidebar_filter_search_icon absolute left-2 inset-y-0 flex items-center">
          <IoSearch style={{ color: "grey" }} />
        </div>
        <input
          className="sidebar_filter_search_input appearance-none border-2 pl-7 border-gray-300 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none"
          id="username"
          type="text"
          placeholder="Search..."
        />
        <div className="absolute right-2 inset-y-0 flex items-center">
          <MdOutlineDateRange style={{ color: "grey" }} />
        </div>
      </div>

      {/* --- tasks tabs --- */}
      <div className="mx-3 mt-8 font-normal border-b-1 border-zinc-300 pb-2">
        <h3 className="text-sm font-semibold">Tasks</h3>

        {/* -- upcoming --  */}
        <div className="flex justify-between px-2 my-1  rounded-md py-1">
          <div className="flex justify-center items-center gap-3">
            <FaAnglesRight fontSize={"12px"} color="grey" />
            <p className="font-normal text-sm text-zinc-700">Upcoming</p>
          </div>

          <div className="bg-zinc-300 rounded-sm w-1/10 flex justify-center items-center">
            <p className="text-zinc-900 font-medium text-xs">12</p>
          </div>
        </div>

        {/* -- today --  */}
        <div className="flex justify-between px-2 my-2 bg-zinc-300 rounded-md py-1">
          <div className="flex justify-center items-center gap-3">
            <NavLink
              to="/today-task"
              className="flex justify-center items-center gap-3"
            >
              <LuListTodo fontSize={"14px"} color="grey" />
              <p className="font-medium text-sm text-zinc-700">Today</p>
            </NavLink>
          </div>

          <div className="bg-zinc-200 rounded-sm w-1/10 flex justify-center items-center">
            <p className="text-zinc-900 font-medium text-xs">5</p>
          </div>
        </div>

        {/* -- calender --  */}
        <div className="flex justify-between px-2 my-2 rounded-md py-1">
          <div className="flex justify-center items-center gap-3">
            <MdOutlineDateRange fontSize={"14px"} color="grey" />
            <p className="font-normal text-sm text-zinc-700">Calender</p>
          </div>
        </div>

        {/* -- sticky wall --  */}
        <div className="flex justify-between px-2 my-2 rounded-md py-1">
          <div className="flex justify-center items-center gap-3">
            <MdOutlineStickyNote2 fontSize={"14px"} color="grey" />
            <p className="font-normal text-sm text-zinc-700">Sticky Wall</p>
          </div>
        </div>
      </div>

      {/* --- Lists Category tabs --- */}
      <div className="mx-3 mt-5 font-normal border-b-1 border-zinc-300 pb-2">
        <h3 className="text-sm font-semibold">List</h3>

        {/* -- personal --  */}
        <div className="flex justify-between px-2 my-1 bg-zinc-300 rounded-md py-1">
          <div className="flex justify-center items-center gap-3">
            <RiCheckboxBlankFill fontSize={"16px"} color="#FE6667" />
            <p className="font-medium text-sm text-zinc-700">Personal</p>
          </div>

          <div className="bg-zinc-200 rounded-sm w-1/10 flex justify-center items-center">
            <p className="text-zinc-900 font-medium text-xs">6</p>
          </div>
        </div>

        {/* -- work --  */}
        <div className="flex justify-between px-2 my-2 rounded-md py-1">
          <div className="flex justify-center items-center gap-3">
            <RiCheckboxBlankFill fontSize={"16px"} color="#60DCEE" />
            <p className="font-normal text-sm text-zinc-700">Work</p>
          </div>

          <div className="bg-zinc-300 rounded-sm w-1/10 flex justify-center items-center">
            <p className="text-zinc-900 font-medium text-xs">3</p>
          </div>
        </div>

        {/* -- list --  */}
        <div className="flex justify-between px-2 my-2 rounded-md py-1">
          <div className="flex justify-center items-center gap-3">
            <RiCheckboxBlankFill fontSize={"16px"} color="#FFD335" />
            <p className="font-normal text-sm text-zinc-700">List 1</p>
          </div>

          <div className="bg-zinc-300 rounded-sm w-1/10 flex justify-center items-center">
            <p className="text-zinc-900 font-medium text-xs">5</p>
          </div>
        </div>

        {/* -- add list --  */}
        <div className="flex justify-between px-2 my-2 rounded-md py-1">
          <div className="flex justify-center items-center gap-3">
            <FaPlus fontSize={"14px"} color="grey" />
            <p className="font-normal text-sm text-zinc-700">Add New List</p>
          </div>
        </div>
      </div>

      {/* --- settings/sign out --- */}
      <div className="mx-3 mt-20 font-normal border-zinc-300 pb-2">
        {/* -- setting --  */}
        <div className="flex justify-between px-2 my-1 rounded-md py-1">
          <div className="flex justify-center items-center gap-3">
            <IoIosSettings fontSize={"16px"} color="grey" />
            <p className="font-normal text-sm text-zinc-700">Setting</p>
          </div>
        </div>

        {/* -- sign out --  */}
        <div className="flex justify-between px-2 rounded-md py-1">
          <div className="flex justify-center items-center gap-3">
            <FaSignOutAlt fontSize={"14px"} color="grey" />
            <p className="font-normal text-sm text-zinc-700">Sign out</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
