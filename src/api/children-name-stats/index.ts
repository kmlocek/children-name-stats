import {
  INameVoivodeshipData,
  INameYearlyData,
  IVoivodeshipData,
  IYearlyData,
} from '../../data/children-name-stats';
import axios, { AxiosResponse } from 'axios';

const API_ENDPOINT_YEARLY_DATA =
  'http://localhost:8080/api/children-name-stats/yearly-data';

const API_ENDPOINT_VOIVODESHIP_DATA =
  'http://localhost:8080/api/children-name-stats/voivodeship-data';

export const yearlyDataRequest = (
  name: string,
  gender: string,
): Promise<INameYearlyData> => {
  return axios
    .get(`${API_ENDPOINT_YEARLY_DATA}?name=${name}&gender=${gender}`)
    .then((response: AxiosResponse<IYearlyData[]>) => ({
      name: name.toUpperCase(),
      data: response.data,
    }));
};

export const voivodeshipDataRequest = (
  name: string,
  gender: string,
): Promise<INameVoivodeshipData> => {
  return axios
    .get(`${API_ENDPOINT_VOIVODESHIP_DATA}?name=${name}&gender=${gender}`)
    .then((response: AxiosResponse<IVoivodeshipData[]>) => ({
      name: name.toUpperCase(),
      data: response.data,
    }));
};
