// reducers.js
import { FETCH_TODOS_SUCCESS, ADD_TODO_SUCCESS } from './actionTypes';

const initialState = {
  todos: [],
};

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS_SUCCESS:
      return { ...state, todos: action.payload };
    case ADD_TODO_SUCCESS:
      return { ...state, todos: [...state.todos, action.payload] };
    default:
      return state;
  }
};
