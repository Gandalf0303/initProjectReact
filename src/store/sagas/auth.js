import { put, all, takeLatest } from 'redux-saga/effects';

function* logout() {
  yield put({ type: 'auth/clear' });
}

export default [
  function* fetchWatcher() {
    yield all([takeLatest('auth/logout', logout)]);
  }
];
