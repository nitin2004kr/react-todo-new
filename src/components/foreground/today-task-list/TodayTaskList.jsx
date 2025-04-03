import React from "react";
import { FaPlus } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import ViewTodayTaskList from "./ViewTodayTaskList";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoSearchSharp } from "react-icons/io5";
import { NavLink } from "react-router";

function TodayTaskList() {
  const [isVisible, setIsVisible] = useState(false);

  const handleCloseTaskList = (data) => {
    setIsVisible(data);
  };

  return (
    <div className="flex w-full h-full overflow-hidden">
      <div
        className={`h-full transition-[width] duration-500 ease-in-out ${
          isVisible ? "w-[50%]" : "w-[100%]"
        }`}
      >
        <h1 className="text-4xl font-bold ">Today Tasks</h1>

        {/* --- search/add todo task --- */}
        <div className="flex mt-10 justify-between">
          {/* --- search input box --- */}
          <div className="relative w-1/3">
            <div className="sidebar_filter_search_icon px-3 absolute left-2 inset-y-0 flex items-center">
              <IoSearchSharp fontSize={"15px"} color="grey" />
            </div>

            <input
              className="sidebar_filter_search_input appearance-none border-2 pl-10 border-gray-300 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none"
              id="username"
              type="text"
              placeholder="Search Task"
            />
          </div>

          {/* --- add new task button --- */}
          <div className="relative bg-blue-500 rounded-md mx-3 px-4 py-2 hover:bg-blue-600">
            <div className="sidebar_filter_search_icon absolute left-2 inset-y-0 flex items-center ">
              <FaPlus fontSize={"14px"} color="white" />
            </div>
            <NavLink
              to="/today-task/add-today-task"
              className=" text-white font-bold ml-3"
            >
              Add New Task
            </NavLink>
          </div>                  
        </div>

        {/* --- Tasks ---  */}
        <div className="mx-3 mt-6">
          {/* -- task 1. --  */}
          <div className="flex justify-between px-2 my-1 py-2 border-b-2 border-zinc-300">
            <div className="flex justify-center items-center gap-3">
              <input type="checkbox" />
              <p className="font-medium text-sm text-zinc-700">
                Research content ideas
              </p>
            </div>

            <div
              className="flex justify-center items-center"
              onClick={() => setIsVisible(true)}
            >
              <FaAngleRight color="grey" fontSize={"18px"} />
            </div>
          </div>

          {/* -- task 2. --  */}
          <div className="flex justify-between px-2 my-1 py-2 border-b-2 border-zinc-300">
            <div className="flex justify-center items-center gap-3">
              <input type="checkbox" />
              <p className="font-medium text-sm text-zinc-700">
                Create a Database of guest authors
              </p>
            </div>

            <div
              className="flex justify-center items-center"
              onClick={() => setIsVisible(true)}
            >
              <FaAngleRight color="grey" fontSize={"18px"} />
            </div>
          </div>

          {/* -- task 3. --  */}
          <div className="flex justify-between px-2 my-1 py-2 border-b-2 border-zinc-300">
            <div className="flex justify-center items-center gap-3">
              <input type="checkbox" />
              <p className="font-medium text-sm text-zinc-700">
                Renew's driver's license
              </p>
            </div>

            <div
              onClick={() => setIsVisible(true)}
              className="flex justify-center items-center"
            >
              <FaAngleRight color="grey" fontSize={"18px"} />
            </div>
          </div>

          {/* -- task 4. --  */}
          <div className="flex justify-between px-2 my-1 py-2 border-b-2 border-zinc-300">
            <div className="flex justify-center items-center gap-3">
              <input type="checkbox" checked={true} />
              <p className="font-medium text-sm text-zinc-700">
                Consult accountant
              </p>
            </div>

            <div
              onClick={() => setIsVisible(true)}
              className="flex justify-center items-center"
            >
              <FaAngleRight color="grey" fontSize={"18px"} />
            </div>
          </div>

          {/* -- task 5. --  */}
          <div className="flex justify-between px-2 my-1 py-2 border-b-2 border-zinc-300">
            <div className="flex justify-center items-center gap-3">
              <input type="checkbox" />
              <p className="font-medium text-sm text-zinc-700">
                Print business Card
              </p>
            </div>

            <div
              onClick={() => setIsVisible(true)}
              className="flex justify-center items-center"
            >
              <FaAngleRight color="grey" fontSize={"18px"} />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5 }}
            className="w-1/2 h-full px-8"
          >
            <div className="">
              <ViewTodayTaskList closeTaskList={handleCloseTaskList} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TodayTaskList;
