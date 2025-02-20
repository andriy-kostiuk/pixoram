import React, { useEffect, useReducer } from 'react';
import { Good } from '../types/good';

type Action =
  | { type: 'add'; payload: Good }
  | { type: 'delete'; payload: number }
  | { type: 'reset' };

type StateItem = {
  good: Good;
  count: number;
};

const initialState: StateItem[] = [];

function reducer(state: StateItem[], action: Action) {
  switch (action.type) {
    case 'add':
      const element = state.find((item) => item.good.id === action.payload.id);

      if (element) {
        element.count++;

        return [...state];
      }

      const newItem: StateItem = {
        good: action.payload,
        count: 1,
      };

      return [...state, newItem];
    case 'delete':
      return state.filter((item) => item.good.id !== action.payload);
    case 'reset':
      return [];
    default:
      return state;
  }
}

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext((action: Action) => {});

interface Props {
  children: React.ReactNode;
}

const getInitialState = () => {
  try {
    const storedState = localStorage.getItem('cart');
    if (storedState === null) {
      return initialState;
    }
    return JSON.parse(storedState);
  } catch (error) {
    console.error('Error getting state from localStorage:', error);
    return initialState;
  }
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
