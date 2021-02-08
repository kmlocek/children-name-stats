import childrenNameStats from './children-name-stats';
import { all, fork } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([fork(childrenNameStats)]);
}
