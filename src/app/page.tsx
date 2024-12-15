"use client";

// hooks and other importations
import { useContext } from "react";
import Image from "next/image";

// context importation
import { Context } from "@/components/Context/Contex";

// components importation
import Input from "@/components/Input/Input";
import TaskWrapper from "@/components/TaskWrapper/TaskWrapper";

const Home = () => {
  const { theme, changeTheme, state } = useContext(Context)!;

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

          <article className={theme == "dark" ? "bg-very-dark-desaturated-blue rounded mt-5" : "bg-very-light-gray rounded mt-5"}>
            <div>
              {(state.length) ? state.map((task) => {
                return <TaskWrapper key={task.id} text={task.content} isCompleted={task.completed}/>;
              }) : <div><h1>Not found</h1></div>}
            </div>
            <footer></footer>
          </article>
        </section>
      </main>
    </div>
  );
};

export default Home;