/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

// hooks and utilities importation
import { KeyboardEvent, useContext, useRef, useState } from "react";

// context importation
import { Context } from "../Context/Context";

// icons importation
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";


interface TaskProps {
  id: number;
  text: string;
  isCompleted: boolean;
}

const TaskWrapper = ({ id, text, isCompleted }: TaskProps) => {
  // context usage
  const { theme, dispatch } = useContext(Context)!;

  // States
  const [isTaskChecked, setIsTaskChecked] = useState<boolean>(isCompleted);
  const [newTaskContent, setNewTaskContent] = useState<string>(text);

  // refs
  const titleRef = useRef<HTMLHeadingElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const circleMarkAsChecked = useRef<HTMLSpanElement>(null);
  const markedAsCheckIconRef = useRef<HTMLSpanElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  const editTaskOptionRef = useRef<HTMLDivElement>(null);

  // functions
  const showInputEditTask = () => {
    titleRef.current!.style.display = "none";
    deleteButtonRef.current!.style.display = "none";
    inputRef.current!.style.display = "initial";
    editTaskOptionRef.current!.style.display = "flex";

    inputRef.current!.focus();
  };

  const editTaskContent = (id: number) => {
    if(newTaskContent.trim()) {
      dispatch({ type: "EDIT", payload: id, content: newTaskContent, completed: false });
    } else {
      alert(`It's impossible to edit the task with an empty value`);
    }

    cancelTaskEditAction();
  };

  const cancelTaskEditAction = () => {
    titleRef.current!.style.display = "initial";
    deleteButtonRef.current!.style.display = "initial";
    inputRef.current!.style.display = "none";
    editTaskOptionRef.current!.style.display = "none";
  };


  return (
    <div className={theme == "dark" ? "w-full h-14 bg-very-dark-desaturated-blue rounded flex items-center justify-between" : "w-full h-14 bg-very-light-gray rounded flex items-center justify-between"}>
      <div className="flex items-center gap-3">
        <span
          ref={circleMarkAsChecked}
          className={isCompleted ? "hidden" : "w-6 h-6 rounded-full border-2 border-dark-grayish-blue ml-2"}
          onClick={() => {
            dispatch({ type: "DONE", payload: id });
          }}
        ></span>
        <span
          ref={markedAsCheckIconRef}
          className={isCompleted ? "w-6 h-6 rounded-full ml-2 bg-linear flex items-center justify-center" : "hidden"}
          onClick={() => {
            dispatch({ type: "DONE", payload: id });
          }}
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
          value={newTaskContent}
          maxLength={40}
          type="text"
          className={
            theme == "dark"
              ? "h-full text-base bg-transparent ml-1 text-very-light-gray outline-none border-b-2 border-very-light-grayish-blue hidden" : "h-full text-base bg-transparent text-very-dark-grayish-blue outline-none border-b-2 border-very-dark-grayish-blue hidden"
          }
          onKeyDown={(e: KeyboardEvent) => {
            if(e.key === "Escape") {
              cancelTaskEditAction();
            } else if(e.key === "Enter") {
              editTaskContent(id);
            }
          }
          }
          onChange={(e) => setNewTaskContent(e.target.value)}
          onFocus={() => inputRef.current!.select()}
        />
      </div>
      <button
        ref={deleteButtonRef}
        className={theme === "dark" ? "mr-3 text-very-light-grayish-blue" : "mr-3 text-very-dark-grayish-blue"}
        onClick={() => dispatch({ type: "DELETE", payload: id })}
      >
        <FaTrash />
      </button>

      <div
        ref={editTaskOptionRef}
        className="hidden items-center gap-3 mr-3">
        <button
          className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center"
          onClick={() => editTaskContent(id)}
        >
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