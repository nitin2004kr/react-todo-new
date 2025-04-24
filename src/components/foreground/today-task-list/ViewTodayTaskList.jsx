import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "./utils/DeleteModal";
import { deleteTodayTaskTodo, getTodayTaskTodo } from "../../../redux/actions/todayTask/todayTaskAction";
import { toast } from "react-toastify";

function ViewTodayTaskList({ closeTaskList, taskid }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.todayTask);
  const { loading, error, taskData } = data;

  const task = taskData.filter((t) => t.id === taskid);
  const [formData, setFormData] = useState(task);
  // destructing formData fields
  const { id, title, description, priority, recurring_task, list, uploadFile } =
    formData[0];

  // close viewTaskComponet handle
  const closeTaskListComponent = (data) => {
    closeTaskList(data);
  };

  // task delete function form database
  const handledeleteTask = (data) => {
    if (data) {
      dispatch(deleteTodayTaskTodo(id));
      dispatch(getTodayTaskTodo());
      toast.success(`Task deleted successfully!`)
      closeTaskList(false);
    }
    setShowDeleteModal(false)
  };

  return (
    <div className="w-full h-full bg-zinc-200 rounded-xl px-4 py-3 relative overflow-hidden">
      {/* --- heading ---  */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-zinc-700">Task:</h1>
        <div>
          <ImCross
            className="text-zinc-700"
            fontSize={"13px"}
            onClick={() => closeTaskListComponent(false)}
          />
        </div>
      </div>

      {/* --- taks title ---  */}
      <div className="relative mx-3 mt-5">
        <label className="font-semibold">Title</label>
        <input
          className="sidebar_filter_search_input appearance-none border-b-2 border-gray-300 transition-colors rounded-md w-full py-2 px-1 text-gray-800 leading-tight focus:outline-none"
          id="title"
          name="title"
          type="text"
          defaultValue={title}
          readonly
        />
      </div>

      {/* --- taks description ---  */}
      <div className="relative mx-3 mt-3">
        <label className="font-semibold">Description</label>
        <textarea
          className="sidebar_filter_search_input appearance-none border-b-2 border-gray-300 transition-colors rounded-md w-full py-2 px-1 text-gray-800 leading-tight focus:outline-none"
          id="description"
          name="description"
          type="text"
          defaultValue={description}
          readonly
        />
      </div>

      {/* ----- priority ----- */}
      <div className="relative mx-3 mt-5">
        <label className="font-semibold">Priority</label>
        <input
          className="sidebar_filter_search_input appearance-none border-b-2 border-gray-300 transition-colors rounded-md w-full py-2 text-gray-800 leading-tight focus:outline-none"
          id="priority"
          name="priority"
          type="text"
          defaultValue={priority}
          readonly
        />
      </div>

      {/* ----- recurring task ---- */}
      <div className="relative mx-3 mt-5">
        <label className="font-semibold">Recurring Task</label>
        <input
          className="sidebar_filter_search_input appearance-none border-b-2 border-gray-300 transition-colors rounded-md w-full py-2 text-gray-800 leading-tight focus:outline-none"
          id="recurring_task"
          name="recurring_task"
          type="text"
          defaultValue={recurring_task}
          readonly
        />
      </div>

      {/* ---- list ----- */}
      <div className="relative mx-3 mt-5">
        <label className="font-semibold">List</label>
        <input
          className="sidebar_filter_search_input appearance-none border-b-2 border-gray-300 transition-colors rounded-md w-full py-2 text-gray-800 leading-tight focus:outline-none"
          id="list"
          name="list"
          type="text"
          defaultValue={list}
          readonly
        />
      </div>

      {/* ----- upload file ----- */}
      <div className="mt-8 mx-3">
        <label className="font-semibold">Upload</label>
        <br />
        <input
          type="file"
          name="uploadFile"
        ></input>
      </div>

      {/* ---- delete/ update task ----  */}
      <div className="flex justify-evenly items-center mt-15">
        <button onClick={() => setShowDeleteModal(true)}>
          <div className="border-1 bg-yellow-300 text-sx py-1 px-10 rounded-sm font-semibold hover:bg-yellow-400">
            Delete
          </div>
        </button>
        <div className="border-1 bg-yellow-300 text-sx py-1 px-10 rounded-sm font-semibold hover:bg-yellow-400">
          Update
        </div>
      </div>


      {/* -- delete modal show -- */}
      {
        showDeleteModal &&
        <DeleteModal taskTitle={title} handledeleteTask={handledeleteTask} />
      }
    </div>
  );
}

export default ViewTodayTaskList;
