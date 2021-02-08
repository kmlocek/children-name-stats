import { createAction } from '@reduxjs/toolkit';

export const getApiActionCreator = (api: string) => (operation: string) => ({
  [operation]: createAction(`${api}/${operation}`),
  [`${operation}Success`]: createAction(`${api}/${operation}Success`),
  [`${operation}Error`]: createAction(`${api}/${operation}Error`),
});

export const getActionCreator = (name: string) => (
  action: string,
  hasSuccess: boolean = false,
  hasError: boolean = false,
) => {
  const act = {
    [action]: createAction(`${name}/${action}`),
  };
  if (hasSuccess)
    act[`${action}Success`] = createAction(`${name}/${action}Success`);
  if (hasError) act[`${action}Error`] = createAction(`${name}/${action}Error`);
  return act;
};
