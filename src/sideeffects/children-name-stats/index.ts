import { call, put, takeLatest, select, all } from 'redux-saga/effects';
import { getFormGender, getFormName } from './selectors';
import {
  getVoivodeshipDataSuccess,
  getVoivodeshipDataError,
  getChildrenNameStatsData,
  getYearlyDataSuccess,
  getYearlyDataError,
  INameVoivodeshipData,
  INameYearlyData,
} from '../../data/children-name-stats';
import {
  voivodeshipDataRequest,
  yearlyDataRequest,
} from '../../api/children-name-stats';
import { setName } from '../../data/form';

function* fetchData() {
  const name = yield select(getFormName);
  const gender = yield select(getFormGender);
  if (name) {
    yield all([
      fetchYearlyData(name, gender),
      fetchVoivodeshipData(name, gender),
    ]);
  }
  yield put(setName(''));
}

function* fetchYearlyData(name: string, gender: string) {
  try {
    const data: INameYearlyData = yield call(() =>
      yearlyDataRequest(name, gender),
    );
    yield put(getYearlyDataSuccess(data));
  } catch (e) {
    yield put(getYearlyDataError());
  }
}

function* fetchVoivodeshipData(name: string, gender: string) {
  try {
    const data: INameVoivodeshipData = yield call(() =>
      voivodeshipDataRequest(name, gender),
    );
    yield put(getVoivodeshipDataSuccess(data));
  } catch (e) {
    yield put(getVoivodeshipDataError());
  }
}

export default function* watchers() {
  yield takeLatest(getChildrenNameStatsData.type, fetchData);
}
