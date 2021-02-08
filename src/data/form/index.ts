import { createSlice } from '@reduxjs/toolkit';
import { IOption } from '../../view/children-name-stats/form-inputs';
// import { getActionCreator } from '../utils';

export interface IForm {
  name: string;
  gender: string;
  options: IOption[];
  selectedOptions: IOption[];
  selectedVoivodeships: IVoivodeship[];
}

const voivodeships: IVoivodeship[] = [
  { id: 2, name: 'Dolnośląskie' },
  { id: 4, name: 'Kujawsko-Pomorskie' },
  { id: 6, name: 'Lubelskie' },
  { id: 8, name: 'Lubuskie' },
  { id: 10, name: 'Łódzkie' },
  { id: 12, name: 'Małopolskie' },
  { id: 14, name: 'Mazowieckie' },
  { id: 16, name: 'Opolskie' },
  { id: 18, name: 'Podkarpackie' },
  { id: 22, name: 'Pomoroskie' },
  { id: 24, name: 'Śląskie' },
  { id: 26, name: 'Świętokrzyskie' },
  { id: 28, name: 'Warmińsko-Mazurskie' },
  { id: 30, name: 'Wielkopolskie' },
  { id: 32, name: 'Zachodniopomorskie' },
];

export interface IVoivodeship {
  id: number;
  name: string;
}

const initialOptions = () => [
  { label: 'Wszystkie', value: '*' },
  ...voivodeships.map((v) => ({ label: v.name, value: v.id })),
];

const name = 'form';

const initialState: IForm = {
  name: '',
  gender: 'GIRL',
  options: initialOptions(),
  selectedOptions: initialOptions(),
  selectedVoivodeships: voivodeships,
};

const formSlice = createSlice({
  name,
  initialState,
  reducers: {
    setName: (state: IForm, { payload }) => {
      state.name = payload;
      return state;
    },
    setGender: (state: IForm, { payload }) => {
      state.gender = payload;
      return state;
    },
    setVoivodeships: (state: IForm, { payload }: { payload: IOption[] }) => {
      const filteredOptions = payload.filter((o) => o.value !== '*');
      state.selectedOptions = payload;
      const voivodeshipIds = filteredOptions.map((o) => o.value);
      state.selectedVoivodeships = voivodeships.filter((v) =>
        voivodeshipIds.includes(v.id),
      );
      return state;
    },
  },
});

export const { setName, setGender, setVoivodeships } = formSlice.actions;
export default formSlice.reducer;
