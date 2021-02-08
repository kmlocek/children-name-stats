import React, { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setGender, setName, setVoivodeships } from '../../../data/form';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

import Spinner from 'react-bootstrap/Spinner';
import { Plus, Trash } from 'react-bootstrap-icons';
// @ts-ignore
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import { clearStatsData } from '../../../data/children-name-stats';

interface IProps {
  onSubmit: () => void;
  loading: boolean;
  disabled: boolean;
  name: string;
  gender: string;
  options: IOption[];
  selectedOptions: IOption[];
}

export interface IOption {
  label: string;
  value: string | number;
}

const StyledForm = styled.form`
  position: sticky;
  top: 0;
  background-color: #4a4a49;
  z-index: 10;
  width: 100%;
  padding-top: 5px;
`;
const StyledInputGroup = styled(InputGroup)`
  display: flex;
  justify-content: center;
`;
const NameAndGenderInputs = styled.div`
  padding-bottom: 10px;
  min-width: 360px;
  max-width: 600px;
  display: flex;
  justify-content: space-around;
`;
const VoivodeshipsAndButtons = styled.div`
  padding-left: 0;
  display: flex;
  justify-content: space-around;
  min-width: 360px;
  max-width: 450px;

  > div.col-7 > div {
    display: flex;

    > button {
      flex-grow: 1;
    }
  }
`;
const Buttons = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;
const FormInputs = (props: IProps) => {
  const dispatch = useDispatch();
  const {
    onSubmit,
    name,
    gender,
    options,
    selectedOptions,
    loading,
    disabled,
  } = props;

  const onVoivodeshipChange = (value: any, event: any) => {
    if (event.action === 'select-option' && event.option.value === '*') {
      dispatchSelectedVoivodeships(options);
    } else if (
      event.action === 'deselect-option' &&
      event.option.value === '*'
    ) {
      dispatchSelectedVoivodeships([]);
    } else if (event.action === 'deselect-option') {
      dispatchSelectedVoivodeships(value.filter((o: any) => o.value !== '*'));
    } else if (value.length === options.length - 1) {
      dispatchSelectedVoivodeships(options);
    } else {
      dispatchSelectedVoivodeships(value);
    }
  };

  const dispatchSelectedVoivodeships = (options: IOption[]) =>
    dispatch(setVoivodeships([...options]));

  const getDropdownPlaceholder = () => {
    const count =
      selectedOptions.length === options.length
        ? 'Wszystkie'
        : selectedOptions.length;
    return `Województwa: ${count}`;
  };

  const clearData = () => {
    dispatch(clearStatsData());
  };

  const onFormSubmit = (e: any) => {
    e?.preventDefault();
    if (!disabled) onSubmit();
  };
  return (
    <StyledForm onSubmit={onFormSubmit}>
      <StyledInputGroup className={'p-2'}>
        <NameAndGenderInputs className={'col-6'}>
          <FormControl
            className={'col-7 mr-3'}
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch(setName(e.target.value))
            }
            placeholder={'Imię'}
          />
          <FormControl
            className={'col-5'}
            as="select"
            value={gender}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch(setGender(e.target.value))
            }
          >
            <option value={'GIRL'}>Dziewczynka</option>
            <option value={'BOY'}>Chłopiec</option>
          </FormControl>
        </NameAndGenderInputs>

        <VoivodeshipsAndButtons className={'col-6'}>
          <div className={'col-7 mr-3 pr-0'}>
            <ReactMultiSelectCheckboxes
              placeholderButtonLabel="Województwa"
              getDropdownButtonLabel={getDropdownPlaceholder}
              options={options}
              onChange={onVoivodeshipChange}
              value={selectedOptions}
            />
          </div>
          <Buttons className={'col-5 pr-0 pl-0 pb-2'}>
            <StyledButton
              className={'mr-2'}
              onClick={onFormSubmit}
              disabled={disabled}
            >
              {loading ? (
                <Spinner animation={'border'} size={'sm'} />
              ) : (
                <Plus size={25} />
              )}
            </StyledButton>
            <StyledButton className={''} onClick={clearData} variant={'danger'}>
              <Trash size={25} />
            </StyledButton>
          </Buttons>
        </VoivodeshipsAndButtons>
      </StyledInputGroup>
      <hr className={'mt-0 mb-0'} />
    </StyledForm>
  );
};

export default FormInputs;
