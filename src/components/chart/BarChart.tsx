import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';
import styled from 'styled-components';

export interface IBarChartDataset {
  label: string;
  data: number[];
  fill: boolean;
  borderColor: string;
  backgroundColor: string;
}

interface IProps {
  labels: string[] | number[];
  datasets: IBarChartDataset[];
  title: string;
}

let chart: Chart;

const StyledLineChart = styled.div`
  width: 95%;
  margin: auto;
  padding: 15px 0;
  min-height: 850px;

  @media (min-width: 320px) and (max-width: 800px) {
    min-height: 550px;
  }
`;

const BarChart = (props: IProps) => {
  const myChartRef = useRef() as React.MutableRefObject<HTMLCanvasElement>;
  const { labels, datasets, title } = props;

  useEffect(() => {
    if (typeof chart !== 'undefined') chart.destroy();
    chart = new Chart(myChartRef.current, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        title: {
          display: true,
          text: title,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                maxRotation: 90,
                minRotation: 45,
              },
            },
          ],
        },
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }, [labels, title, datasets]);

  return (
    <StyledLineChart>
      <canvas ref={myChartRef} />
    </StyledLineChart>
  );
};

export default BarChart;
