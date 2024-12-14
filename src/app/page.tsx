"use client";

import { useContext } from "react";
import { Context } from "@/conponents/Context/Contex";

const Home = () => {
  const { theme } = useContext(Context)!;

  return (
    <div>
      <header className={theme === "dark" ? "bg-dark h-80" : "bg-light h-80"}></header>
      <main className={theme === "dark" ? "h-full bg-very-dark-blue" : "bg-red-300"}>
        <article>ok</article>
      </main>
    </div>
  );
};

export default Home;