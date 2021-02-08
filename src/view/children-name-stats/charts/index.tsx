import React, { useCallback, useEffect, useState } from 'react';
import LineChart, {
  ILineChartDataset,
} from '../../../components/chart/LineChart';
import {
  INameVoivodeshipData,
  INameYearlyData,
  IVoivodeshipData,
} from '../../../data/children-name-stats';
import { getRandomColor } from '../../../utils/helpers';
import BarChart from '../../../components/chart/BarChart';
import { IBarChartDataset } from '../../../components/chart/BarChart';
import { IVoivodeship } from '../../../data/form';

interface IProps {
  nameYearlyData: INameYearlyData[];
  voivodeshipNameData: INameVoivodeshipData[];
  selectedVoivodeships: IVoivodeship[];
}

interface IColorWithName {
  name: string;
  color: string;
}

const Charts = (props: IProps) => {
  const { nameYearlyData, voivodeshipNameData, selectedVoivodeships } = props;
  const [namesWithColor, setNamesWithColor] = useState([] as IColorWithName[]);

  const [yearLabels, setYearLabels] = useState([] as number[]);
  const [voivodeshipLabels, setVoivodeshipLabels] = useState([] as string[]);

  const [lineChartDatasets, setLineChartDatasets] = useState(
    [] as ILineChartDataset[],
  );
  const [barChartDatasets, setBarChartDatasets] = useState(
    [] as IBarChartDataset[],
  );

  const getColor = useCallback(
    (name: string) => {
      const found = namesWithColor.find(
        (nameWithColor) => nameWithColor.name === name,
      );
      if (found) return found.color;
      else {
        const color = getRandomColor(namesWithColor.length);
        setNamesWithColor([...namesWithColor, { name: name, color }]);
        return color;
      }
    },
    [namesWithColor],
  );

  useEffect(() => {
    if (!yearLabels.length && nameYearlyData.length) {
      setYearLabels(
        nameYearlyData[0].data
          .map((data) => data.year)
          .sort((year1, year2) => year1 - year2),
      );
    }
  }, [yearLabels, nameYearlyData, nameYearlyData.length]);

  useEffect(() => {
    const datasets = nameYearlyData.map((nameYearlyData) => {
      const { name, data } = nameYearlyData;
      const color = getColor(name);
      return {
        label: name.toUpperCase(),
        data: data.map((el) => el.count),
        fill: false,
        borderColor: color,
        backgroundColor: color,
      } as ILineChartDataset;
    });
    setLineChartDatasets(datasets);
  }, [nameYearlyData, nameYearlyData.length, getColor]);

  useEffect(() => {
    setVoivodeshipLabels(selectedVoivodeships.map((v) => v.name));
  }, [selectedVoivodeships, selectedVoivodeships.length]);

  useEffect(() => {
    if (voivodeshipLabels.length) {
      const createBarChartData = (
        voivodeshipData: IVoivodeshipData[],
      ): number[] => {
        return selectedVoivodeships.map((v) => {
          const found = voivodeshipData.find((vd) => vd.voivodeshipId === v.id);
          if (found) return found.count;
          else return 0;
        });
      };

      const datasets = voivodeshipNameData.map((nameVoivodeshipData) => {
        const { name, data } = nameVoivodeshipData;
        const color = getColor(name);
        return {
          label: name.toUpperCase(),
          data: createBarChartData(data),
          fill: false,
          borderColor: color,
          backgroundColor: color,
        } as IBarChartDataset;
      });
      setBarChartDatasets(datasets);
    }
  }, [
    getColor,
    selectedVoivodeships,
    voivodeshipNameData,
    voivodeshipNameData.length,
    voivodeshipLabels.length,
  ]);

  return (
    <>
      {lineChartDatasets.length > 0 && (
        <LineChart
          datasets={lineChartDatasets}
          labels={yearLabels}
          title={'Imiona w latach 2000-2019'}
        />
      )}
      {lineChartDatasets.length > 0 && selectedVoivodeships.length > 0 && (
        <BarChart
          datasets={barChartDatasets}
          labels={voivodeshipLabels}
          title={'Imiona w województwach w roku 2020'}
        />
      )}
    </>
  );
};

export default Charts;
