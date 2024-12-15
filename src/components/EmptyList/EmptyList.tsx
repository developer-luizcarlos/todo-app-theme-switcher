"use client";

// hooks and utilities importation
import { useContext } from "react";

// global context importation
import { Context } from "../Context/Context";

const EmptyList = () => {
  const { theme } = useContext(Context)!;

  return (
    <div
      className={
        theme === "dark"
          ? "h-12 text-center text-lg text-dark-grayish-blue flex items-center justify-center bg-very-dark-desaturated-blue rounded rounded-b-none border-b-[1px] border-b-very-dark-grayish-blue"
          : "h-12 text-center text-lg text-very-dark-grayish-blue flex items-center justify-center bg-very-light-gray rounded rounded-b-none border-b-[1px] border-b-very-dark-grayish-blue"}>
      <h3>Nothing to see here</h3>
    </div>
  );
};

export default EmptyList;