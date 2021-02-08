import { createSlice } from '@reduxjs/toolkit';

export interface IYearlyData {
  count: number;
  year: number;
}

export interface IVoivodeshipData {
  count: number;
  voivodeshipId: number;
}

export interface INameYearlyData {
  name: string;
  data: IYearlyData[];
}

export interface INameVoivodeshipData {
  name: string;
  data: IVoivodeshipData[];
}

export interface IChildrenNameStats {
  yearlyNamesData: INameYearlyData[];
  voivodeshipNameData: INameVoivodeshipData[];
  yearlyDataLoading: boolean;
  voivodeshipDataLoading: boolean;
}

const name = 'children-name-stats';

const initialState: IChildrenNameStats = {
  yearlyNamesData: [],
  voivodeshipNameData: [],
  yearlyDataLoading: false,
  voivodeshipDataLoading: false,
};

const childrenNameStatsSlice = createSlice({
  name,
  initialState,
  reducers: {
    getChildrenNameStatsData: (state) => {
      state.yearlyDataLoading = true;
      state.voivodeshipDataLoading = true;
    },
    getYearlyDataSuccess: (
      state: IChildrenNameStats,
      { payload }: { payload: INameYearlyData },
    ) => {
      state.yearlyDataLoading = false;
      const index = state.yearlyNamesData.findIndex(
        (data) => data.name === payload.name,
      );
      if (index >= 0) {
        state.yearlyNamesData[index] = payload;
      } else {
        state.yearlyNamesData = [...state.yearlyNamesData, payload];
      }
    },
    getYearlyDataError: (state) => {
      state.yearlyDataLoading = false;
      return state;
    },
    getVoivodeshipDataSuccess: (
      state: IChildrenNameStats,
      { payload }: { payload: INameVoivodeshipData },
    ) => {
      state.voivodeshipDataLoading = false;
      const index = state.voivodeshipNameData.findIndex(
        (data) => data.name === payload.name,
      );
      if (index >= 0) {
        state.voivodeshipNameData[index] = payload;
      } else {
        state.voivodeshipNameData = [...state.voivodeshipNameData, payload];
      }
    },
    getVoivodeshipDataError: (state) => {
      state.voivodeshipDataLoading = false;
      return state;
    },
    clearStatsData: (state) => {
      state = initialState;
      return state;
    },
  },
});

export const {
  getChildrenNameStatsData,
  getYearlyDataSuccess,
  getYearlyDataError,
  getVoivodeshipDataSuccess,
  getVoivodeshipDataError,
  clearStatsData,
} = childrenNameStatsSlice.actions;
export default childrenNameStatsSlice.reducer;
