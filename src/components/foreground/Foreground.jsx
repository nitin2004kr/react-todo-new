import React from "react";
import TodayTaskList from "./today-task-list/TodayTaskList";
import { Route, Routes } from "react-router";
import AddTodayTaskList from "./today-task-list/AddTodayTaskList";
import UpcomingTask from "./upcoming-task-list/UpcomingTask";

function Foreground() {
  return (
    <div className="w-full h-full relative">
      <Routes>
        {/* --- today task routing section --- */}
        <Route path="/today-task">
          <Route path="" element={<TodayTaskList />} />
          <Route path="add-today-task" element={<AddTodayTaskList />} />
          <Route path="edit-today-task/:id" element={<AddTodayTaskList />} />
        </Route>

        {/* --- upcoming task routing section --- */}
        <Route path="/upcoming-task">
          <Route path="" element={<UpcomingTask />} />
        </Route>
      </Routes>
    </div>
  );
}

export default Foreground;
