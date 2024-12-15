"use client";

// hooks and utilities importation
import { KeyboardEvent, useContext, useRef, useState } from "react";

// context importation
import { Context } from "../Context/Contex";

// icons importation
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";


interface TaskProps {
  text: string;
  isCompleted: boolean;
}

const TaskWrapper = ({ text, isCompleted }: TaskProps) => {
  const { theme } = useContext(Context)!;

  const [isTaskChecked, setIsTaskChecked] = useState<boolean>(false);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const circleMarkAsChecked = useRef<HTMLSpanElement>(null);
  const markedAsCheckIconRef = useRef<HTMLSpanElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  const editTaskOptionRef = useRef<HTMLDivElement>(null);

  const showInputEditTask = () => {
    titleRef.current!.style.display = "none";
    deleteButtonRef.current!.style.display = "none";
    inputRef.current!.style.display = "initial";
    editTaskOptionRef.current!.style.display = "flex";
  };

  const cancelTaskEditAction = () => {
    titleRef.current!.style.display = "initial";
    deleteButtonRef.current!.style.display = "initial";
    inputRef.current!.style.display = "none";
    editTaskOptionRef.current!.style.display = "none";
  };

  const changeMarkAsDoneTask = () => {
    setIsTaskChecked((previousValue) => {
      return !previousValue;
    });

    if(isTaskChecked) {
      circleMarkAsChecked.current!.style.display = "none";
      markedAsCheckIconRef.current!.style.display = "flex";
    } else {
      circleMarkAsChecked.current!.style.display = "initial";
      markedAsCheckIconRef.current!.style.display = "none";
    }
  };

  return (
    <div className={theme == "dark" ? "w-full h-14 rounded flex items-center justify-between" : "w-full h-14 rounded flex items-center justify-between"}>
      <div className="flex items-center gap-3">
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
        <h2
          ref={titleRef}
          className={
            theme === "dark"
              ? isCompleted
                ? "text-very-light-grayish-blue line-through"
                : "text-very-light-grayish-blue"
              : isCompleted
                ? "line-through text-very-dark-grayish-blue"
                : "text-very-dark-grayish-blue"
          }
          onClick={showInputEditTask}
        >{text}
        </h2>
        <input
          ref={inputRef}
          type="text"
          className={
            theme == "dark"
              ? "h-full text-xl bg-transparent ml-1 text-very-light-gray outline-none border-b-2 border-very-light-grayish-blue hidden" : "h-full text-xl bg-transparent text-very-dark-grayish-blue outline-none border-b-2 border-very-dark-grayish-blue hidden"
          }
          onKeyDown={(e: KeyboardEvent) => {
            if(e.key === "Escape") {
              cancelTaskEditAction();
            }
          }}
        />
      </div>
      <button
        ref={deleteButtonRef}
        className={theme === "dark" ? "mr-3 text-very-light-grayish-blue" : "mr-3 text-very-dark-grayish-blue"}>
        <FaTrash />
      </button>

      <div
        ref={editTaskOptionRef}
        className="hidden items-center gap-3 mr-3">
        <button className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
          <FaCheck className="text-very-light-gray" />
        </button>

        <button
          className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center"
          onClick={cancelTaskEditAction}
        >
          <FaTrash className="text-very-light-gray" />
        </button>
      </div>
    </div>
  );
};

export default TaskWrapper;