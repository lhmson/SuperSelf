import React, { useState, createContext } from "react";
import { Text, View } from "react-native";

const TodoContext = createContext([{}, () => {}]);

const TodoProvider = (props) => {
  const [state, setState] = useState({
    currentlyAddTodo: false,
    currentlyDeleteTodo: false,
  });

  return (
    <TodoContext.Provider value={[state, setState]}>
      {props.children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
