"use client";

// hooks importation
import { useContext, useState, KeyboardEvent } from "react";

// context importation
import { Context } from "../Context/Contex";

const Input = () => {
  // context values
  const { theme, dispatch } = useContext(Context)!;

  // states
  const [inputValue, setInputValue] = useState<string>("");

  // global and other variables
  const isTaskChecked = false;

  // functions
  const createTask = (value: string): void => {
    if(value.trim()) {
      dispatch({ type: "ADD", content: inputValue, completed: isTaskChecked });
    } else {
      alert("It's impossible to create tasks with empty content.");
    }
  };

  return (
    <div
      className={theme == "dark" ? "w-full h-14 bg-very-dark-desaturated-blue rounded flex items-center justify-between" : "w-full h-14 bg-very-light-gray rounded flex items-center justify-between"}
    >
      <span
        className="w-6 h-6 rounded-full border-2 border-dark-grayish-blue ml-2"></span>

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