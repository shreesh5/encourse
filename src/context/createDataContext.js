import React, {useReducer} from 'react';

// Helper function for creating different types of context.
export default (reducer, actions, initialState) => {
  const Context = React.createContext();

  const Provider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const boundActions = {};

    const actionKeys = Object.keys(actions);
    actionKeys.forEach((key) => {
      boundActions[key] = actions[key](dispatch);
    });

    return (
      <Context.Provider value={{state, ...boundActions}}>
        {children}
      </Context.Provider>
    );
  };

  return {Context, Provider};
};
