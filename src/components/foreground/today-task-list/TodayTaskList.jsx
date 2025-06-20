import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import ViewTodayTaskList from "./ViewTodayTaskList";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoSearchSharp } from "react-icons/io5";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getTodayTaskTodo, updateTodayTaskTodo } from "../../../redux/actions/todayTask/todayTaskAction";
import { BiTask } from "react-icons/bi";
import { toast } from "react-toastify";
import Confetti from "react-confetti";
import { format } from 'date-fns';
import { GoDotFill } from "react-icons/go";
import { PiWarningCircleLight } from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";
import EmailShare from "../../utiles/EmailShare";
import WhatsappShare from "../../utiles/Whatsapp";

function TodayTaskList() {
  const [isVisible, setIsVisible] = useState(false); // - to show or hide the view task component
  const [taskId, setTaskId] = useState(null); // - passing the id to the view task component, and holding the clicked task id
  const [taskComplete, setTaskComplete] = useState(false); // - state to hold the actions of task completion
  const [searchedText, setSearchedText] = useState(''); // - state for to filter out the data form taskData 
  const [showConfirUncheckedTaskPopUp, setShowConfirUncheckedTaskPopUp] = useState(false); // - state for to show the pop-up for confirmation of unchecked the completed task
  const [showIncompleteTaskPopUp, setShowIncompleteTaskPopUp] = useState(false); // - state for to show the pop-up after the confirmation of timmer for incomplete task again
  const [taskStatusFilter, setTaskStatusFilter] = useState(''); // - state for to hold the task status filtered value 
  const [taskCategoryFilter, setTaskCategoryFilter] = useState(''); // - state for to hold the task Category filtered value 
  const [allTask, setAllTask] = useState([]); // - state for hold all type of task, completed, incomplte, all
  const [showThreeDotModal, setShowThreeDotModal] = useState(false); // - state for to open the three dot modal
  const [modalHoverId, setModalHoverId] = useState(null); // - state for to open the three dot modal
  const [showNote, setShowNote] = useState(false); // - state for to open the three dot modal

  // getting the all task 
  const tasks = useSelector((state) => state.todayTask);
  const { loading, error, taskData } = tasks;
  const dispatch = useDispatch();


  // calling the action to retrive the fresh data
  useEffect(() => {
    dispatch(getTodayTaskTodo())
  }, []);

  const handleCloseTaskList = (data) => {
    setIsVisible(data);
    setShowNote(false);
  };

  // method for complete task to perform actions
  const handleChecked = (e, id) => {
    setTaskId(id)
    const completedTask = taskData.filter((t) => t.id === id);
    let task = completedTask[0];
    let newData;

    let formattedTime = format(new Date(), "MMM d 'at' h:mm a");
    const checked = e.target.checked;
    if (checked) {
      newData = { ...task, taskCompleted: true, completedAt: formattedTime };
      setTaskComplete(true);
      setTimeout(() => setTaskComplete(false), 4000);
      toast.success('Task finished. Keep it up. 👍');
      setTimeout(() => {
        setShowConfirUncheckedTaskPopUp(true);
      }, 2000);
    } else {

      setTimeout(() => {
        setShowConfirUncheckedTaskPopUp(true);
      }, 2000);
      if (showConfirUncheckedTaskPopUp) {
        setShowIncompleteTaskPopUp(true);
      }
      setTaskComplete(false);
    };
    dispatch(updateTodayTaskTodo(newData));
    dispatch(getTodayTaskTodo());
  };


  // method for to do incomplete the completed task
  const handleIncompleteTaskPopUp = (data) => {
    if (data) {
      const task = taskData.filter(t => t.id === taskId);
      if (task) {
        const newData = { ...task[0], taskCompleted: false, completedAt: null };
        dispatch(updateTodayTaskTodo(newData));
        dispatch(getTodayTaskTodo());
        toast.warning('Task marked as incomplete');
      }
    }
    setShowConfirUncheckedTaskPopUp(true);
    setShowIncompleteTaskPopUp(false);
  };

  // filter the data as per searched input and rendering in lists
  useEffect(() => {
    let filteredData = taskData;

    // First apply search filter if there's search text
    if (searchedText || taskStatusFilter === 'all') {
      filteredData = filteredData.filter(task =>
        task.title.toLowerCase().startsWith(searchedText.toLowerCase())
      );
    }

    // Then apply status filter
    if (taskStatusFilter === 'completed') {
      filteredData = filteredData.filter(task => task.taskCompleted === true);
    } else if (taskStatusFilter === 'incomplete') {
      filteredData = filteredData.filter(task => task.taskCompleted === false || task.taskCompleted === null);
    }

    setAllTask(filteredData);
  }, [searchedText, taskStatusFilter, taskData]);

  // filter all completed task form all tasks
  const allCompletedTask = taskData.filter(task => task.taskCompleted === true);
  // filter all pending task form all tasks
  const allPendingTask = taskData.length - allCompletedTask.length;

  // method of task status filter
  const handleTaskStatusFilter = (e) => {
    const selectedValue = e.target.value;
    setTaskStatusFilter(selectedValue);
  };

  // method of task category fileter
  const handleTaskCategroyFilter = (e) => {
    const selectedValue = e.target.value;
    console.log(selectedValue)
    setTaskCategoryFilter(selectedValue);
  };

  // method for to show three dot modal when mouse enters
  const handleShowThreeDotModal = (id) => {
    setModalHoverId(id)
    setShowThreeDotModal(true);
  }

  // method for to hide three dot modal when mouse leaave
  const handleHideThreeDotModal = () => {
    setModalHoverId(null)
    setShowThreeDotModal(false);
  }

  //  method for to add notes in the task
  const handleNoteChange = (id) => {
    setIsVisible(true);
    setTaskId(id);
    setShowNote(true);
  }




  return (
    <div className="flex w-full h-full overflow-hidden">
      <div
        className={`h-full transition-[width] duration-500 ease-in-out flex flex-col ${isVisible ? "w-[50%]" : "w-[100%]"}`}
      >
        {/* --- task info - pending, completed --- */}
        <div className='flex justify-between items-center'>
          <h1 className="text-4xl font-bold ">Today Tasks {`(${taskData.length})`}</h1>
          <div className="mx-5 text-right font-semibold">
            <p className="flex justify-between gap-3">Completed Task <span>: {allCompletedTask.length}</span></p>
            <p className="flex justify-between gap-3">Pending Task <span>: {allPendingTask}</span></p>
          </div>
        </div>

        {/* --- search/add/filters todo task --- */}
        {
          taskData?.length > 0 &&
          <div className="flex mt-10 justify-between">
            <div className="flex justify-between w-1/2">
              {/* --- search input box --- */}
              <div className="relative w-3/5">
                <div className="sidebar_filter_search_icon px-3 absolute left-2 inset-y-0 flex items-center">
                  <IoSearchSharp fontSize={"15px"} color="grey" />
                </div>

                <input
                  className="sidebar_filter_search_input appearance-none border-2 pl-10 border-gray-300 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none"
                  id="username"
                  type="text"
                  placeholder="Search Task"
                  onChange={(e) => setSearchedText(e.target.value)}
                />
              </div>

              {/* filter task status */}
              <div className="flex-1 items-center flex">
                <div className="mx-3 flex item-center">
                  <select className="bg-blue-500 text-white font-semibold px-2 py-2 rounded-sm border-0 [&>option]:bg-white [&>option]:text-black" onChange={(e) => handleTaskStatusFilter(e)}>
                    <option hidden className="bg-white text-black">Task status</option>
                    <option value={"completed"}>Completed</option>
                    <option value={"incomplete"}>Incomplete</option>
                    <option value={"all"}>All</option>
                  </select>
                </div>


                {/* filter task category */}
                {
                  taskStatusFilter === 'incomplete' &&
                  <div className="flex item-center">
                    <select className="bg-blue-500 text-white font-semibold px-2 py-2 rounded-sm border-0 [&>option]:bg-white [&>option]:text-black" onChange={(e) => handleTaskCategroyFilter(e)}>
                      <option hidden className="bg-white text-black">Category</option>
                      <option value={"deadline"}>Deadline</option>
                      <option value={"created_at"}>Created At</option>
                    </select>
                  </div>
                }


              </div>
            </div>

            {/* --- add new task button show only if task available --- */}
            <div className="relative bg-blue-500 rounded-md mx-3 px-4 py-2 hover:bg-blue-600">
              <div className="sidebar_filter_search_icon absolute left-2 inset-y-0 flex items-center ">
                <FaPlus fontSize={"14px"} color="white" />
              </div>
              <NavLink
                to="/dashboard/today-task/add-today-task"
                className=" text-white font-bold ml-3"
              >
                Add New Task
              </NavLink>
            </div>
          </div>
        }


        {/* --- All Tasks / completed at / three dot ---  */}
        <div className="mt-6 flex flex-col flex-1 overflow-y-auto">
          {/* -- dynamic task rendering --  */}
          {allTask?.length > 0 ? (allTask?.map((task) => (
            <div className={`flex justify-between px-2  py-3 border-b-2 border-zinc-300 hover:bg-zinc-200 ${isVisible && taskId === task.id ? "bg-zinc-200" : ""}`} key={task.id}>
              <div className="flex justify-center items-center gap-3">
                <input type="checkbox" checked={task.taskCompleted} onChange={(e) => handleChecked(e, task.id)} />
                <div className="group relative">
                  <p className={`flex items-center gap-1 font-medium text-sm text-zinc-700 ${task.taskCompleted ? 'line-through' : ''}`}>
                    <GoDotFill className={`${task.priority === 'high' ? 'text-red-500' : task.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'}`} />
                    {task.title}
                  </p>
                  <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ">
                    <div className=" text-zinc-800 text-xs rounded whitespace-nowrap">
                      Priority: {task.priority}
                    </div>
                  </div>
                </div>
              </div>


              <div className="flex justify-center items-center gap-3">
                {
                  task.taskCompleted &&
                  <div className="text-green-500 text-sm">
                    Completed on <span className="font-semibold">{task.completedAt}</span>
                  </div>
                }

                {/* three dot  */}
                <div className="relative">
                  <BsThreeDotsVertical onMouseEnter={() => handleShowThreeDotModal(task.id)} />

                  {
                    showThreeDotModal && modalHoverId === task.id &&
                    <div className="absolute right-[20px] bg-white py-1 border-2 border-zinc-300 rounded-md min-h-[120px] w-[100px]"
                      onMouseLeave={() => handleHideThreeDotModal()}
                    >
                      <ul className="flex justify-evenly gap-1 flex-col h-full">
                        <li className="px-2 hover:bg-zinc-200 cursor-pointer text-sm" onClick={() => handleNoteChange(task.id)}>{task?.note?.length > 0 ? "Edit" : "Add"} Note</li>
                        <li className="px-2 mt-2 underline text-xs font-semibold text-zinc-400">Share via</li>
                        <li className="hover:bg-zinc-200 cursor-pointer">
                          <EmailShare
                            btnText='Email'
                            btnStyle='px-2 text-sm'
                            mailSubject={`New Task Shared : "${task.title}"`}
                            mailBody={
                              `Hi [Recipient Name],

                                [Sender Name] has shared a task with you.

                                📌 Task: ${task.title}  
                                📝 Description: ${task.description}  
                                📅 Due Date: ${task.deadline}  
                                ⏱️ Priority: ${task.priority}
                                📃 List: ${task.list} 

                                You can open this task and check out full source of this task directly in the app.

                                Best regards,  
                                The Todo App Team
                            `}
                          />
                        </li>
                        <li className="hover:bg-zinc-200 cursor-pointer">
                          <WhatsappShare
                            btnText='WhatsApp'
                            btnStyle='px-2 text-sm'
                            message={
                              `Hello There,
                              This is Task Reminder for you!

                                📌 Task: ${task.title}  
                                📝 Description: ${task.description}  
                                📅 Due Date: ${task.deadline}  
                                ⏱️ Priority: ${task.priority}
                                📃 List: ${task.list} 

                               You can open this task and check out full source of this task directly in the app.
                               Thankyou.`
                            }
                          />
                        </li>
                        {/* <li className="px-2 hover:bg-zinc-200 cursor-pointer text-sm">Export</li> */}
                      </ul>
                    </div>
                  }
                </div>

                <div
                  className="flex justify-center items-center"
                  onClick={() => {
                    setIsVisible(true)
                    setTaskId(task.id)
                  }}
                >
                  <FaAngleRight color="grey" fontSize={"18px"} />
                </div>

              </div>
            </div>
          ))) : // loading showing untill data not comes form database
            loading ? (
              <div className="flex flex-1 justify-center items-center flex-row gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
              </div>) : (
              // showing this button only if task is empty  to add the task
              <div className="flex flex-1 flex-col justify-center items-center px-2 my-1 py-2 border-1 border-zinc-300">
                <div className="h-[140px]">
                  <BiTask className="h-full w-full text-zinc-300" />
                </div>
                <div>
                  <h2 className="text-2xl text-zinc-500 font-semibold">No Task Available Yet !</h2>
                  <NavLink to='/today-task/add-today-task'>
                    <p className="text-center bg-blue-500 text-zinc-100 mt-2 py-2 rounded-sm font-semibold hover:bg-blue-600">
                      Click here to Add Task
                    </p>
                  </NavLink>
                </div>
              </div>
            )
          }
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
            <div className="flex h-full">
              <ViewTodayTaskList closeTaskList={handleCloseTaskList} taskid={taskId} showNote={showNote} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* -- this the animation of poper after the task completed  -- */}
      {taskComplete && <Confetti className="w-full h-full" />}

      {/* -- this is pop-up of to confirm the completed task to incomplete --  */}
      {
        showIncompleteTaskPopUp && <div className="absolute bg-zinc-400/50 h-full w-full flex justify-center items-center rounded-sm">
          <div className="bg-white h-[400] w-1/2 rounded-xl flex flex-col justify-center items-center gap-7 py-8">
            <PiWarningCircleLight className="text-8xl text-red-500" />

            <h1 className="text-lg text-center mx-8 ">This task was marked as completed a while ago. Are you sure you want to mark it as <span className="font-semibold">incomplete</span> ?</h1>

            <div className="flex justify-center items-center gap-4">
              <button className="bg-zinc-200 py-2 px-6 rounded-full hover:bg-zinc-300 font-semibold" onClick={() => handleIncompleteTaskPopUp(false)}>No,Keep as completed</button>
              <button className="bg-green-400 py-2 px-6 text-white rounded-full hover:bg-green-500 font-semibold" onClick={() => handleIncompleteTaskPopUp(true)}>Yes, mark as incomplete</button>
            </div>


          </div>
        </div>
      }
    </div>
  );
}

export default TodayTaskList;
