// import React, { useState } from 'react';
// import './NamesStats.css';
// import { Button, FormControl, InputGroup } from 'react-bootstrap';
// import Spinner from 'react-bootstrap/Spinner';
// import { Plus, Trash } from 'react-bootstrap-icons';
// import { createArrayFromRange } from '../../utils/helpers';
// import LineChart from '../../components/chart/LineChart';
// import BarChart from '../../components/chart/BarChart';
//
// const NamesStats = () => {
//   // const [loadingYears, setLoadingYears] = useState(false);
//   // const [loadingVoivodeship, setLoadingVoivodeship] = useState(false);
//   const [yearRanges] = useState(createArrayFromRange(2000, 2019));
//   const [inputName, setInputName] = useState('');
//   const [gender, setGender] = useState('K');
//   const [lineChartData, setLineChartData] = useState({
//     labels: yearRanges,
//     datasets: [],
//   });
//   const [barChartData, setBarChartData] = useState({
//     labels: [],
//     datasets: [
//       {
//         data: [],
//         borderColor: colorList[0],
//         backgroundColor: colorList[0],
//       },
//     ],
//   });
//
//   const addName = (newName, gender) => {
//     const color = getRandomColor(lineChartData.datasets.length);
//     setLoadingYears(true);
//     setLoadingVoivodeship(true);
//     getCountFor2019InMalopolska(newName.trim(), gender)
//       .then((data) => {
//         if (data) {
//           const barChartLabels = [
//             ...barChartData.labels,
//             data.name.toUpperCase(),
//           ];
//           const barChartDataset = { ...barChartData.datasets[0] };
//           barChartDataset.data = [...barChartDataset.data, data.count];
//           setBarChartData({
//             ...barChartData,
//             labels: barChartLabels,
//             datasets: [barChartDataset],
//           });
//         }
//         setLoadingVoivodeship(false);
//       })
//       .catch(() => setLoadingVoivodeship(false));
//   };
//
//   const createYearsData = (name, stats, color) => {
//     return {
//       label: name.toUpperCase(),
//       data: extractCountData(stats),
//       fill: false,
//       borderColor: color,
//       backgroundColor: color,
//     };
//   };
//
//   const extractCountData = (stats) => {
//     return yearRanges.map((year) => {
//       let extractedStat = stats.find((stat) => stat.year === year);
//       return extractedStat != null ? extractedStat.count : 0;
//     });
//   };
//
//   return (
//     <div className={'NameStats'}>
//       <div className={'input-container'} l>
//         <InputGroup className={'inputs p-2'}>
//           <FormControl
//             className={'col-4 mr-3'}
//             value={inputName}
//             onChange={(event) => setInputName(event.target.value)}
//             placeholder={'Imię'}
//           />
//           <FormControl
//             className={'col-4 mr-3'}
//             as="select"
//             value={gender}
//             onChange={(event) => setGender(event.target.value)}
//           >
//             <option value={'GIRL'}>Kobieta</option>
//             <option value={'BOY'}>Mężczyzna</option>
//           </FormControl>
//           <Button
//             className={'col-2 mr-2'}
//             onClick={addNameHandler}
//             disabled={loadingYears || loadingVoivodeship}
//           >
//             {loadingYears || loadingVoivodeship ? (
//               <Spinner animation={'border'} size={'sm'} />
//             ) : (
//               <Plus size={25} />
//             )}
//           </Button>
//           <Button className={'col-2'} onClick={clearHandler} variant={'danger'}>
//             <Trash size={25} />
//           </Button>
//         </InputGroup>
//         <hr className={'mt-0 mb-0'} l />
//       </div>
//       <div className={'chart-container'}>
//         {lineChartData.datasets.length ? (
//           <LineChart data={lineChartData} title={'Imiona w latach 2000-2019'} />
//         ) : null}
//         {barChartData.labels.length ? (
//           <BarChart
//             data={barChartData}
//             title={'Województwo Małopolskie 2019'}
//           />
//         ) : null}
//       </div>
//     </div>
//   );
// };
//
// export default NamesStats;
//
export const hehe = true;
