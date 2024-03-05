import React, { createContext, useReducer, ReactNode } from 'react';

interface SelectionState {
  selectedPages: string[];
}
interface SelectionProviderProps {
    children: ReactNode;
  }
type SelectionAction =
  | { type: 'ADD_PAGE'; payload: string }
  | { type: 'REMOVE_PAGE'; payload: string }
  | { type: 'CLEAR_SELECTION' };

// Define the reducer
const selectionReducer = (state: SelectionState, action: SelectionAction): SelectionState => {
  switch (action.type) {
    case 'ADD_PAGE':
      // Avoid adding duplicates
      if (state.selectedPages.includes(action.payload)) {
        return state;
      }
      return { ...state, selectedPages: [...state.selectedPages, action.payload] };
    case 'REMOVE_PAGE':
      return { ...state, selectedPages: state.selectedPages.filter(page => page !== action.payload) };
    case 'CLEAR_SELECTION':
      return { ...state, selectedPages: [] };
    default:
      return state;
  }
};

// Create the Context
export const SelectionContext = createContext<{
  state: SelectionState;
  dispatch: React.Dispatch<SelectionAction>;
} | undefined>(undefined);


export const SelectionProvider = ({ children } :SelectionProviderProps ) => {
  const [state, dispatch] = useReducer(selectionReducer, { selectedPages: [] });

  return (
    <SelectionContext.Provider value={{ state, dispatch }}>
      {children}
    </SelectionContext.Provider>
  );
};

