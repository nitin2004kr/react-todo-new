import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "./utils/DeleteModal";
import { deleteTodayTaskTodo, getTodayTaskTodo } from "../../../redux/actions/todayTask/todayTaskAction";
import { toast } from "react-toastify";
import AttachmentFilePreview from "./utils/AttachmentFilePreview";
import { NavLink } from "react-router";
import DOMPurify from 'dompurify';

function ViewTodayTaskList({ closeTaskList, taskid }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false); // - state to handle to show the delete modal
  const [showAttachmentPreview, setShowAttachmentPreview] = useState(false); // -- state to show the attachments

  const dispatch = useDispatch();
  const data = useSelector((state) => state.todayTask);
  const { loading, error, taskData } = data;

  const task = taskData.filter((t) => t.id === taskid);
  const [formData, setFormData] = useState(task);
  // destructing formData fields
  const { id, title, description, priority, recurring_task, list, completedAt, createdAt, taskCompleted, deadline, uploadFile } =
    formData[0];

  const descriptionSanetizedData = DOMPurify.sanitize(description);


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

  // close the preview modal 
  const closeAttachmentPreview = (close) => {
    setShowAttachmentPreview(close);
  };

  return (
    <div className="w-full h-full bg-zinc-200 rounded-xl flex flex-col flex-1 px-4 py-3 relative overflow-hidden">
      {/* --- heading / close icon ---  */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-zinc-700">Task {taskCompleted ? 'Completed' : ''} :</h1>
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
        <div
          className="sidebar_filter_search_input border-b-2 border-gray-300 transition-colors rounded-md w-full py-2 px-1 text-gray-800 leading-tight"
          dangerouslySetInnerHTML={{ __html: descriptionSanetizedData }}
        ></div>
      </div>

      {/* --- taks priority / list ---  */}
      <div className="flex justify-between items-center mx-3 mt-5">
        {/* ----- priority ----- */}
        <div className="relative">
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

        {/* ---- list ----- */}
        <div className="relative">
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
      </div>

      {/* --- taks recurring / Deadline ---  */}
      <div className="flex justify-between  items-center mx-3 mt-5">
        {/* ----- recurring task ---- */}
        <div className="relative ">
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

        {/* ----- deadline ---- */}
        <div className="relative">
          <label className="font-semibold">Deadline</label>
          <input
            className="sidebar_filter_search_input appearance-none border-b-2 border-gray-300 transition-colors rounded-md w-full py-2 text-gray-800 leading-tight focus:outline-none"
            id="deadline"
            name="deadline"
            type="text"
            defaultValue={deadline}
            readonly
          />
        </div>
      </div>


      {/* --- taks completed at / created at ---  */}
      <div className="flex justify-between items-center mx-3 mt-5">
        {/* --- created at ---  */}
        <div className="relative mx-3 mt-3">
          <label className="font-semibold">Created At</label>
          <input
            className="sidebar_filter_search_input appearance-none border-b-2 border-gray-300 transition-colors rounded-md w-full py-2 text-gray-800 leading-tight focus:outline-none"
            id="completedAt"
            name="completedAt"
            type="text"
            defaultValue={createdAt}
            readonly
          />
        </div>

        {/* --- completed at ---  */}
        {completedAt &&
          <div className="relative mx-3 mt-3">
            <label className="font-semibold">Completed At</label>
            <input
              className="sidebar_filter_search_input appearance-none border-b-2 border-gray-300 transition-colors rounded-md w-full py-2 text-gray-800 leading-tight focus:outline-none"
              id="completedAt"
              name="completedAt"
              type="text"
              defaultValue={completedAt}
              readonly
            />
          </div>
        }
      </div>


      {/* ----- attachements file ----- */}
      {
        uploadFile.length !== 0 &&
        <div className="mt-8 mx-3 flex justify-start items-center">
          <label className="font-semibold">View Attachment</label>
          <div className="mx-5 border-1 bg-yellow-300 text-sx py-1 px-10 rounded-sm font-semibold hover:bg-yellow-400" onClick={() => setShowAttachmentPreview(true)}>
            <button type='button' >{uploadFile.length > 1 ? 'Preview All' : 'Preview'}</button>
          </div>
        </div>
      }

      {/* ---- delete/ update task ----  */}
      <div className="flex justify-evenly items-center mt-15 absolute bottom-10 w-full">
        <button onClick={() => setShowDeleteModal(true)}>
          <div className="border-1 bg-yellow-300 text-sx py-1 px-10 rounded-sm font-semibold hover:bg-yellow-400">
            Delete
          </div>
        </button>
        <NavLink to={`edit-today-task/${id}`}>
          <div className="border-1 bg-yellow-300 text-sx py-1 px-10 rounded-sm font-semibold hover:bg-yellow-400">
            Update
          </div>
        </NavLink>
      </div>


      {/* -- delete modal show -- */}
      {
        showDeleteModal &&
        <DeleteModal taskTitle={title} handledeleteTask={handledeleteTask} />
      }

      {
        showAttachmentPreview &&
        <AttachmentFilePreview uploadFile={uploadFile} closeAttachmentPreview={closeAttachmentPreview} />
      }
    </div>
  );
}

export default ViewTodayTaskList;
