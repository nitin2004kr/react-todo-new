import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Deadline from "./utils/Deadline";
import { useDispatch, useSelector } from "react-redux";
import { createTodayTaskTodo, updateTodayTaskTodo } from "../../../redux/actions/todayTask/todayTaskAction";
import ButtonLoader from "../../utiles/ButtonLoader";
import { toast } from "react-toastify";
import FileUplaods from "./utils/FileUplaods";
import FroalaEditor from "react-froala-wysiwyg";
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/js/plugins/char_counter.min.js';
import 'froala-editor/js/plugins/save.min.js';
import dayjs from "dayjs";


function AddTodayTaskList() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Submitstatus = useSelector((state) => state.todayTask);
  const { loading, error, taskData } = Submitstatus;

  // getting the data for edit 
  const editTaskData = taskData.filter((t) => t.id === id);

  // -- initializing the form data states
  const [formData, setFormData] = useState({})
  const [isClient, setIsClient] = useState(false); // state for holding the editor mount to display

  useEffect(() => {
    if (id) {
      setFormData(editTaskData[0]) // filling the data if it is for edit 
    } else {
      const savedDesc = localStorage.getItem("savedDesc") || ""; // getting the backup data if it available in the local for description
      const createdDate = dayjs().format('DD-MM-YYYY');
      setFormData({
        title: "",
        description: savedDesc,
        priority: "high",
        recurring_task: "",
        list: "personal",
        deadline: "",
        taskCompleted: null,
        completedAt: '',
        createdAt: createdDate,
        note: '',
        uploadFile: [],
      })
    }
  }, [id])

  // destructing formData fields
  const {
    title,
    description,
    priority,
    recurring_task,
    list,
    uploadFile,
    deadline
  } = formData;


  // initialize the the floala editor on component mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // -- setting the form data into their states
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -- setting the deadline data into their state
  const handleDeadlineChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      deadline: value,
    }));
  };

  // -- setting the uploadFile data into their state getting from FileUplaod Component
  const handleUploadChange = (files) => {
    setFormData((prev) => ({
      ...prev,
      uploadFile: files
    }))
  }

  // -- submitting the form data into the firebase firestore
  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      dispatch(updateTodayTaskTodo(formData));
    } else {
      dispatch(createTodayTaskTodo(formData));
    }

    if (!loading) {
      if (id) {
        toast.success('Task Updated!');
      } else {
        toast.success('Your Today Task Created!');
      }
      navigate('/dashboard/today-task ')
    } else if (error) {
      toast.error('something went wrong!');
    };
    localStorage.removeItem('savedDesc');  // removing backup data of description from storage
  };

  return (
    <>
      <div className="w-full h-full border-2 border-zinc-400 rounded-lg overflow-hidden">
        <div className="text-2xl font-bold my-2 mx-5 text-zinc">
          <h1>Add Today Task Form</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col h-[80vh] overflow-y-auto custom-scroll">
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
              <label className="text-zinc-900 font-semibold text-xl block mb-2">
                Description
              </label>
              {isClient && (<FroalaEditor
                model={description} // controlled value
                onModelChange={(content) => {
                  setFormData((prev) => ({
                    ...prev,
                    description: content,
                  }));
                }}
                config={{
                  placeholderText: 'Task description (e.g., Here description goes..)',
                  charCounterCount: true,
                  charCounterMax: 350,
                  saveInterval: 2000,
                  height: '150',
                  width: '1160',
                  events: {
                    "charCounter.exceeded": function () {
                      alert('You have exceeded the maximum allowed characters!')
                    },
                    "save.before": function (html) {
                      localStorage.setItem('savedDesc', html);
                    },
                  }
                }}
                tag="textarea"
              />)}
            </div>



            <div className="w-full h-90 flex justify-between items-start mt-3 gap-2">
              <div className="w-1/4">
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
                  recurring_task?.length > 0 &&
                  <div className="mx-2 mt-2">
                    <label className="text-zinc-900 font-semibold text-xl block">
                      Deadline
                    </label>
                    <Deadline
                      deadline={recurring_task}
                      onDeadlineChange={handleDeadlineChange}
                      editValue={deadline}
                    />
                  </div>
                }
              </div>

              {/* --- upload component --- */}
              <div className="w-3/4 h-full pl-5 flex gap-5 bg-zinc-200 rounded-2xl mt-3">
                <FileUplaods handleUploadChange={handleUploadChange} editUploadData={uploadFile} />
              </div>
            </div>
          </div>

          {/* -- submit button -- */}
          <div className="mx-5 absolute bottom-2 ">
            <button type='submit' className="text-white text-xl my-1 py-1 px-3 bg-blue-600  rounded-sm hover:bg-blue-500 flex justify-center items-center">{false ? <ButtonLoader /> : <div>{id ? 'Update' : 'Submit'}</div>}</button>
          </div>
        </form>

      </div>
    </>
  );
}

export default AddTodayTaskList;
