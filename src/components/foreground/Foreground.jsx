import React from "react";
import TodayTaskList from "./today-task-list/TodayTaskList";
import { Route, Routes } from "react-router";
import AddTodayTaskList from "./today-task-list/AddTodayTaskList";

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
      </Routes>
    </div>
  );
}

export default Foreground;
