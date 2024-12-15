"use client";

// hooks and utilities importation
import { useContext } from "react";
import Image from "next/image";

// global context importation
import { Context } from "../Context/Contex";

const NoData = () => {
  const { theme } = useContext(Context)!;

  return (
    <article className="w-fit flex flex-col items-center justify-center">
      <h1 className={theme === "dark" ? "text-3xl text-very-light-grayish-blue my-4" : "text-3xl text-very-dark-grayish-blue my-4"}>You don&apos;t have any task registered</h1>
      <Image
        src="./images/no-data.svg"
        width={300}
        height={200}
        alt="No data available. This means that you don't have any tasks."
      />
    </article>
  );
};

export default NoData;