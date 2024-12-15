"use client";

import { useContext, useState } from "react";
import { Context } from "../Context/Context";
import TaskWrapper from "../TaskWrapper/TaskWrapper";
import EmptyList from "../EmptyList/EmptyList";

type tasksShowedType = "all" | "active" | "completed";

const ListingTasks = () => {
  const { state, dispatch, theme } = useContext(Context)!;

  const [tasksShowed, setTasksShowed] = useState<tasksShowedType>("all");

  return (
    <div>
      <div>
        {state.map((task) => {
          const taskElement =
            <TaskWrapper key={task.id} id={task.id} text={task.content} isCompleted={task.completed} />;

          if(tasksShowed === "all") {
            return taskElement;
          } else if(tasksShowed === "active") {
            return !task.completed ? taskElement : <EmptyList key={task.id} />;
          } else if(tasksShowed === "completed") {
            return task.completed ? taskElement : <EmptyList key={task.id} />;
          }
        })}
      </div>
      <footer
        className={
          theme === "dark"
            ? "flex items-center justify-between p-3 bg-very-dark-desaturated-blue text-very-dark-gray text-xl capitalize"
            : "flex items-center justify-between p-3 bg-very-light-gray text-dark-grayish-blue text-xl capitalize"}>
        <small
          className={theme === "dark" ? "hover:text-very-light-grayish-blue duration-75 ease cursor-pointer" : "hover:text-very-dark-grayish-blue duration-75 ease cursor-pointer"}>items left</small>
        <div className="flex items-center gap-2">
          <small
            className={
              theme == "dark"
                ? tasksShowed === "all" ? "text-blue-700" : "hover:text-very-light-gray duration-75 ease cursor-pointer"
                : tasksShowed === "all" ? "text-blue-700" : "hover:text-very-dark-grayish-blue duration-75 ease cursor-pointer"}
            onClick={() => setTasksShowed("all")}
          >all</small>
          <small
            className={
              theme == "dark"
                ? tasksShowed === "active" ? "text-blue-700" : "hover:text-very-light-gray duration-75 ease cursor-pointer"
                : tasksShowed === "active" ? "text-blue-700" : "hover:text-very-dark-grayish-blue duration-75 ease cursor-pointer"}
            onClick={() => setTasksShowed("active")}
          >active</small>
          <small
            className={
              theme == "dark"
                ? tasksShowed === "completed" ? "text-blue-700" : "hover:text-very-light-gray duration-75 ease cursor-pointer"
                : tasksShowed === "completed" ? "text-blue-700" : "hover:text-very-dark-grayish-blue duration-75 ease cursor-pointer"}
            onClick={() => setTasksShowed("completed")}
          >completed</small>
        </div>
        <small
          className={theme === "dark" ? "hover:text-very-light-grayish-blue duration-75 ease cursor-pointer" : "hover:text-very-dark-grayish-blue duration-75 ease cursor-pointer"}
          onClick={() => dispatch({ type: "CLEAR" })}
        >clear completed</small>
      </footer>
    </div>
  );
};

export default ListingTasks;