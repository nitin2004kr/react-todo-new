import React, { useState } from "react";
import { useParams } from "react-router";
import { ImCross } from "react-icons/im";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

function AddTodayTaskList() {
  const { id } = useParams();
  console.log("id = ", id);

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

  return (
    <>
      <div className="w-full h-full border-2 border-zinc-400 rounded-lg">
        <div className="text-2xl font-bold my-2 mx-5 text-zin">
          <h1>Add Today Task Form</h1>
        </div>

        <div id="form" className="form p-3">
          {/* title  */}
          <div className="m-2">
            <label className="text-zinc-900 font-semibold text-xl block">
              Title
            </label>
            <input
              className="border-2 border-zinc-500 rounded-sm text-zinc-800 text-xm px-2 py-1  w-full mt-2 focus:shadow-xl"
              type="text"
              placeholder="Task title (e.g., Design homepage)"
            />
          </div>

          {/* description  */}
          <div className="mx-2 mt-3">
            <label className="text-zinc-900 font-semibold text-xl block">
              Description
            </label>
            <textarea
              className="border-2 border-zinc-500 rounded-sm text-zinc-800 text-xm px-2 py-1  w-full mt-2 focus:shadow-xl"
              type="text"
              placeholder="Task description (e.g., Design homepage)"
            ></textarea>
          </div>

          {/* priority  */}
          <div className="mx-2 mt-3">
            <label className="text-zinc-900 font-semibold text-xl block">
              Priority 
            </label>
            <div className="flex gap-3 items-center">
              <Box className="w-full border-2 border-zinc-500 rounded-sm text-zinc-800 text-xm px-2 py-1  w-full mt-2 focus:shadow-xl">
                <FormControl fullWidth>
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

          {/* list  */}
          <div className="mx-2 mt-3">
            <label className="text-zinc-900 font-semibold text-xl block">
              Priority
            </label>
            <div className="flex gap-3 items-center">
              <Box className="w-full border-2 border-zinc-500 rounded-sm text-zinc-800 text-xm px-2 py-1  w-full mt-2 focus:shadow-xl">
                <FormControl fullWidth>
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
        </div>
      </div>
    </>
  );
}

export default AddTodayTaskList;
