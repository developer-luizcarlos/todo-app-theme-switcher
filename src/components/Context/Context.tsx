"use client";

import { useState, useReducer, createContext, ReactNode } from "react";

interface ContextComponentProps {
  children: ReactNode;
}

interface ContextType {
  state: State[];
  dispatch: React.Dispatch<Action>;
  theme: ThemeType;
  changeTheme: () => void;
};

type Action =
  | { type: "ADD"; content: string; completed: boolean; }
  | { type: "EDIT", payload: number, content: string, completed: boolean; }
  | { type: "DONE", payload: number; }
  | { type: "DELETE", payload: number; }
  ;

type State = { id: number, content: string, completed: boolean; };

type ThemeType = "light" | "dark";

const initialTasks: State[] = [
  { id: 0, content: "Click on me and try to edit", completed: false }
];

const reducer = (state: State[], action: Action): State[] => {
  switch(action.type) {
    case "ADD":
      return [
        ...state,
        { id: state.length, content: action.content, completed: action.completed }
      ];
    case "EDIT":
      return state.map((task) => {
        return task.id === action.payload ? { ...task, content: action.content, completed: action.completed } : task;
      });
    case "DONE":
      return state.map((task) => {
        return task.id === action.payload ? { ...task, completed: !task.completed } : task;
      });
    case "DELETE":
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
};

// context which will be passed in the Layout's application
export const Context = createContext<ContextType | null>(null);

const ContextComponent = ({ children }: ContextComponentProps) => {
  const [state, dispatch] = useReducer(reducer, initialTasks);
  const [theme, setTheme] = useState<ThemeType>("dark");

  const changeTheme = (): void => {
    setTheme((previousValue) => {
      return previousValue === "light" ? "dark" : "light";
    });
  };

  return (
    <Context.Provider value={{ state, dispatch, theme, changeTheme }}>
      {children}
    </Context.Provider>
  );
};

export default ContextComponent;