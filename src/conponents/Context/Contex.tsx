"use client";

import { useReducer, createContext, ReactNode } from "react";

interface ContextComponentProps {
  children: ReactNode;
}

interface ContextType {
  state: State[];
  dispatch: React.Dispatch<Action>;
};

type Action = { type: "ADD"; content: string; };

type State = { id: number, content: string, completed: boolean; };

const initialTasks: State[] = [
  { id: 0, content: "Click on me and try to edit", completed: false }
];

const reducer = (state: State[], action: Action): State[] => {
  switch(action.type) {
    case "ADD":
      return [
        ...state,
        { id: state.length, content: action.content, completed: false }
      ];
    default:
      return state;
  }
};

// context which will be passed in the Layout's application
export const Context = createContext<ContextType | null>(null);

const ContextComponent = ({ children }: ContextComponentProps) => {
  const [state, dispatch] = useReducer(reducer, initialTasks);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  );
};

export default ContextComponent;