/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

// hooks importation
import { useContext, useState, useRef, KeyboardEvent } from "react";

// context importation
import { Context } from "../Context/Contex";

// icons importation
import { FaCheck } from "react-icons/fa6";


const Input = () => {
  // context values
  const { theme, dispatch } = useContext(Context)!;

  // states
  const [inputValue, setInputValue] = useState<string>("");
  const [isTaskChecked, setIsTaskChecked] = useState<boolean>(false);

  // refs
  const circleMarkAsChecked = useRef<HTMLSpanElement>(null);
  const markedAsCheckIconRef = useRef<HTMLSpanElement>(null);

  // functions
  const createTask = (value: string): void => {
    if(value.trim()) {
      dispatch({ type: "ADD", content: inputValue, completed: false });
    } else {
      alert("It's impossible to create tasks with empty content.");
    }

    setInputValue("");
  };

  const changeMarkAsDoneTask = () => {
    setIsTaskChecked((previousValue) => {
      const newValue = !previousValue;

      if(newValue) {
        circleMarkAsChecked.current!.style.display = "none";
        markedAsCheckIconRef.current!.style.display = "flex";
      } else {
        circleMarkAsChecked.current!.style.display = "initial";
        markedAsCheckIconRef.current!.style.display = "none";
      }

      return newValue;
    });
  };

  return (
    <div
      className={theme == "dark" ? "w-full h-14 bg-very-dark-desaturated-blue rounded flex items-center justify-between" : "w-full h-14 bg-very-light-gray rounded flex items-center justify-between"}
    >
      <span
        ref={circleMarkAsChecked}
        className="w-6 h-6 rounded-full border-2 border-dark-grayish-blue ml-2"
        onClick={changeMarkAsDoneTask}
      ></span>

      <span
        ref={markedAsCheckIconRef}
        className="w-6 h-6 rounded-full ml-2 bg-linear hidden items-center justify-center"
        onClick={changeMarkAsDoneTask}
      >
        <FaCheck className="text-very-light-gray" />
      </span>

      <input
        type="text"
        maxLength={40}
        value={inputValue}
        placeholder="Press enter to create a new task"
        className={theme == "dark" ? "w-full h-full p-2 text-lg text-very-light-grayish-blue bg-transparent outline-none" : "w-full h-full p-2 text-lg text-very-dark-grayish-blue bg-transparent outline-none"}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e: KeyboardEvent) => {
          if(e.key === "Enter") {
            createTask(inputValue);
          }
        }}
      />
    </div>
  );
};

export default Input;