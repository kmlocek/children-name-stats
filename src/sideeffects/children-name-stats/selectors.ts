import { IForm } from '../../data/form';

export const getFormName = ({ form }: { form: IForm }) => form.name;
export const getFormGender = ({ form }: { form: IForm }) => form.gender;
