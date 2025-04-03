import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

function ViewTodayTaskList({ closeTaskList }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    recurring_task: "",
    list: "",
    uploadFile: "",
  });

  // destructing formData fields
  const { title, description, priority, recurring_task, list, uploadFile } =
    formData;

  // close viewTaskComponet handle
  const closeTaskListComponent = (data) => {
    closeTaskList(data);
  };

  const handleFormData = (e) => {
    const { name, value, files } = e.target;
    const file = files[0];

    if (file) {
      setFormData((prev) => ({
        ...prev,
        uploadFile: file,
      }));
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log("formdata = ", formData);
  }, [formData]);

  return (
    <div className="w-full h-full bg-zinc-200 rounded-xl px-4 py-3">
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
      <div className="relative mx-3 mt-10">
        <label className="font-semibold">Title</label>
        <input
          className="sidebar_filter_search_input appearance-none border-2 pl-7 border-gray-300 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none"
          id="username"
          name="title"
          type="text"
          placeholder="Add New Task"
          value={title}
          onChange={(e) => handleFormData(e)}
        />
      </div>

      {/* --- taks title ---  */}
      <div className="relative mx-3 mt-3">
        <label className="font-semibold">Description</label>
        <textarea
          className="sidebar_filter_search_input appearance-none border-2 pl-7 border-gray-300 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none"
          id="username"
          name="description"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => handleFormData(e)}
        />
      </div>

      {/* ----- priority ----- */}
      <div className="mx-3 mt-5">
        <div className="flex gap-3 items-center">
          <Box className="w-full">
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Priority
              </InputLabel>
              <NativeSelect
                defaultValue={30}
                value={priority}
                inputProps={{
                  name: "priority",
                  id: "uncontrolled-native",
                }}
                onChange={(e) => handleFormData(e)}
              >
                <option value={"high"}>High</option>
                <option value={"medium"}>Medium</option>
                <option value={"low"}>Low</option>
              </NativeSelect>
            </FormControl>
          </Box>
        </div>
      </div>

      {/* ----- recurring task ---- */}
      <div className="mx-3 mt-5">
        <div className="flex gap-3 items-center">
          <Box className="w-full">
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Recurring Task
              </InputLabel>
              <NativeSelect
                defaultValue={30}
                value={recurring_task}
                inputProps={{
                  name: "recurring_task",
                  id: "uncontrolled-native",
                }}
                onChange={(e) => handleFormData(e)}
              >
                <option value={"daily"}>Daily</option>
                <option value={"weekly"}>Weekly</option>
                <option value={"montly"}>Montly</option>
              </NativeSelect>
            </FormControl>
          </Box>
        </div>
      </div>

      {/* ---- list ----- */}
      <div className="mx-3 mt-5">
        <div className="flex gap-3 items-center">
          <Box className="w-full">
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                List
              </InputLabel>
              <NativeSelect
                value={list}
                defaultValue={30}
                inputProps={{
                  name: "list",
                  id: "uncontrolled-native",
                }}
                onChange={(e) => handleFormData(e)}
              >
                <option value={"personal"}>Personal</option>
                <option value={"office"}>Office</option>
              </NativeSelect>
            </FormControl>
          </Box>
        </div>
      </div>

      {/* ----- upload file ----- */}
      <div className="mt-8 mx-3">
        <label className="font-semibold">Upload</label>
        <br />
        <input
          type="file"
          name="uploadFile"
          onChange={(e) => handleFormData(e)}
        ></input>
      </div>

      {/* ---- delete/ update task ----  */}
      <div className="flex justify-evenly items-center mt-15">
        <div className="border-1 bg-yellow-300 text-sx py-1 px-10 rounded-sm font-semibold hover:bg-yellow-400">
          Delete
        </div>
        <div className="border-1 bg-yellow-300 text-sx py-1 px-10 rounded-sm font-semibold hover:bg-yellow-400">
          Update
        </div>
      </div>
    </div>
  );
}

export default ViewTodayTaskList;
