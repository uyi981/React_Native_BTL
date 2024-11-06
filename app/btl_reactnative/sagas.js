// sagas.js
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_TODOS, ADD_TODO, FETCH_TODOS_SUCCESS, FETCH_TODOS_FAILURE, ADD_TODO_SUCCESS, ADD_TODO_FAILURE } from './actionTypes';

const apiUrl = 'https://66fc9adbc3a184a84d17768f.mockapi.io/ToDo';

function* fetchTodosSaga() {
  try {
    const response = yield call(axios.get, apiUrl);
    yield put({ type: FETCH_TODOS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_TODOS_FAILURE, error });
  }
}

function* addTodoSaga(action) {
  try {
    const response = yield call(axios.post, apiUrl, { title: action.payload });
    yield put({ type: ADD_TODO_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: ADD_TODO_FAILURE, error });
  }
}

export function* todoSaga() {
  yield takeLatest(FETCH_TODOS, fetchTodosSaga);
  yield takeLatest(ADD_TODO, addTodoSaga);
}
