import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Deadline from "./utils/Deadline";
import { useDispatch, useSelector } from "react-redux";
import { createTodayTaskTodo } from "../../../redux/actions/todayTask/todayTaskAction";
import ButtonLoader from "../../utiles/ButtonLoader";
import { toast } from "react-toastify";

function AddTodayTaskList() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Submitstatus = useSelector((state) => state.todayTask);
  const { loading, error } = Submitstatus;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "high",
    recurring_task: "",
    list: "personal",
    deadline: "",
    taskCompleted: null,
    completedAt: '',
    uploadFile: "",
  });

  // destructing formData fields
  const {
    title,
    description,
    priority,
    recurring_task,
    list,
  } = formData;

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeadlineChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      deadline: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTodayTaskTodo(formData));

    if (!loading) {
      toast.success('Your Today Task Created!');
      navigate('/today-task ')
    } else if (error) {
      toast.error('something went wrong!');
    };
  };

  return (
    <>
      <div className="w-full h-full border-2 border-zinc-400 rounded-lg">
        <div className="text-2xl font-bold my-2 mx-5 text-zinc">
          <h1>Add Today Task Form</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col h-[100%]">
          <div id="form" className="form p-3 h-[85%]">
            {/* title  */}
            <div className="m-2">
              <label className="text-zinc-900 font-semibold text-xl block">
                Title
              </label>
              <input
                className="border-2 border-zinc-500 rounded-sm text-zinc-800 text-xm px-2 py-1  w-full mt-2 focus:shadow-xl"
                type="text"
                value={title}
                placeholder="Task title (e.g., Design homepage)"
                name='title'
                onChange={handleFormData}
              />
            </div>

            {/* description  */}
            <div className="mx-2 mt-2">
              <label className="text-zinc-900 font-semibold text-xl block">
                Description
              </label>
              <textarea
                className="border-2 border-zinc-500 rounded-sm text-zinc-800 text-xm px-2 py-1  w-full mt-2 focus:shadow-xl"
                type="text"
                value={description}
                placeholder="Task description (e.g., Design homepage)"
                name='description'
                onChange={handleFormData}
              ></textarea>
            </div>

            {/* priority  */}
            <div className="mx-2 mt-2">
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
            <div className="mx-2 mt-2">
              <label className="text-zinc-900 font-semibold text-xl block">
                List
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

            {/* recurring_task */}
            <div className="mx-2 mt-2">
              <label className="text-zinc-900 font-semibold text-xl block">
                Recurring Task
              </label>
              <div className="flex gap-3 items-center">
                <Box className="w-full border-2 border-zinc-500 rounded-sm text-zinc-800 text-xm px-2 py-1  w-full mt-2 focus:shadow-xl">
                  <FormControl fullWidth>
                    <NativeSelect
                      value={recurring_task}
                      defaultValue={30}
                      inputProps={{
                        name: "recurring_task",
                        id: "uncontrolled-native",
                      }}
                      onChange={(e) => handleFormData(e)}
                    >
                      <option value={""} hidden>Select</option>
                      <option value={"daily"}>Daily</option>
                      <option value={"weekly"}>Weekly</option>
                      <option value={"montly"}>Montly</option>
                    </NativeSelect>
                  </FormControl>
                </Box>
              </div>
            </div>

            {/* deadline */}
            {
              recurring_task.length > 0 &&
              <div className="mx-2 mt-2">
                <label className="text-zinc-900 font-semibold text-xl block">
                  Deadline
                </label>
                <Deadline
                  deadline={recurring_task}
                  onDeadlineChange={handleDeadlineChange}
                />
              </div>
            }
          </div>

          {/* -- submit button -- */}
          <div className="mx-5  h-[15%]">
            <button type='submit' className="text-white text-xl my-1 py-1 bg-blue-600 w-1/10 rounded-sm hover:bg-blue-500 flex justify-center items-center">{loading ? <ButtonLoader /> : <div>Submit</div>}</button>
          </div>
        </form>

      </div>
    </>
  );
}

export default AddTodayTaskList;
