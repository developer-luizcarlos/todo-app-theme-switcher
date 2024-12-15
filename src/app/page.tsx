"use client";

// hooks and utilities importations
import { useContext, useState } from "react";
import Image from "next/image";

// context importation
import { Context } from "@/components/Context/Context";

// components importation
import Input from "@/components/Input/Input";
import TaskWrapper from "@/components/TaskWrapper/TaskWrapper";
import NoData from "@/components/NoData/NoData";

type tasksShowedType = "all" | "active" | "completed";

const Home = () => {
  const { theme, changeTheme, state, dispatch } = useContext(Context)!;

  // states
  const [tasksShowed, setTasksShowed] = useState<tasksShowedType>("all");

  return (
    <div className="w-full h-full">
      <header className={theme === "dark" ? "bg-dark h-80" : "bg-light h-80"}></header>
      <main className={theme === "dark" ? "h-full bg-very-dark-blue" : "h-full bg-very-light-grayish-blue"}>
        <section className="w-[540px] absolute top-1/4 left-1/2 -translate-x-1/2">

          <header>

            <div className="flex items-center justify-between mb-6">
              <h1 className="text-4xl text-white font-bold uppercase">todo</h1>
              <button onClick={changeTheme}>
                <Image
                  src={theme === "dark" ? "./images/icon-sun.svg" : "./images/icon-moon.svg"}
                  width={25}
                  height={25}
                  alt={theme == "dark" ? "An icon that represents the sun. Click here to change the theme to light colors" : "An icon that represents the moon. Click here to change the theme to dark colors"}
                />
              </button>
            </div>
            <Input />
          </header>

          <article className="rounded mt-5">
            <div>
              {(state.length) ? state.map((task) => {
                const taskElement =
                  <TaskWrapper key={task.id} id={task.id} text={task.content} isCompleted={task.completed} />;

                if(tasksShowed === "all") {
                  return taskElement;
                } else if(tasksShowed === "active") {
                  if(!task.completed) return taskElement;
                } else if(tasksShowed === "completed") {
                  if(task.completed) return taskElement;
                }
              }) : <NoData />}
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
          </article>
        </section>
      </main>
    </div>
  );
};

export default Home;