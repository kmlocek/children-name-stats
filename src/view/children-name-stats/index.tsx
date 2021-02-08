import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  getChildrenNameStatsData,
  IChildrenNameStats,
} from '../../data/children-name-stats';
import { IForm } from '../../data/form';

import FormInputs from './form-inputs';
import Charts from './charts';
import styled from 'styled-components';

interface IProps {
  childrenNameStats: IChildrenNameStats;
  form: IForm;
}

const ChildrenNameStatsStyled = styled.div`
  background-color: #cccccc;
  height: 100%;
`;

const ChildrenNameStats = (props: IProps) => {
  const {
    form: { name, gender, options, selectedOptions, selectedVoivodeships },
    childrenNameStats: {
      yearlyNamesData,
      voivodeshipNameData,
      yearlyDataLoading,
      voivodeshipDataLoading,
    },
  } = props;

  useEffect(() => {});

  const dispatch = useDispatch();

  return (
    <ChildrenNameStatsStyled>
      <FormInputs
        name={name}
        gender={gender}
        options={options}
        selectedOptions={selectedOptions}
        disabled={yearlyDataLoading || voivodeshipDataLoading || name === ''}
        loading={yearlyDataLoading || voivodeshipDataLoading}
        onSubmit={() => dispatch(getChildrenNameStatsData())}
      />
      <hr className={'mt-0 mb-0'} />
      <Charts
        nameYearlyData={yearlyNamesData}
        voivodeshipNameData={voivodeshipNameData}
        selectedVoivodeships={selectedVoivodeships}
      />
    </ChildrenNameStatsStyled>
  );
};

const mapStateToProps = (state: any) => ({
  childrenNameStats: state.childrenNameStats,
  form: state.form,
});
export default connect(mapStateToProps)(ChildrenNameStats);
