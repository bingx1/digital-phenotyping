import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import COLORS from '../../constant/Colors';

// dummy data for the Types of the Locations Visited usage
const dummyTLVData = {
  series: [
    {
      name: 'number',
      data: [7, 2, 5, 1, 4, 1, 3],
    },
  ],
  options: {
    chart: {
      type: 'bar',
      height: 440,
      stacked: true,
    },
    colors: ['#008FFB'],
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '80%',
      },
    },
    stroke: {
      width: 1,
      colors: ['#fff'],
    },
    dataLabels: {
      enabled: true,
    },

    title: {
      text: 'Place Types Visited',
      align: 'center',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: `${COLORS.text_2}`,
      },
    },
    xaxis: {
      categories: ['Library', 'Pharmacy', 'University', 'Zoo', 'Gym', 'Bank', 'Supermarket'],
    },
  },
};

function TypesLocationsvisitedChart() {
  const [TLVState, setTLVState] = useState(dummyTLVData);
  useEffect(() => {
    setTLVState(dummyTLVData);
  }, []);

  return (
    <Chart
      // @ts-ignore
      options={TLVState.options}
      series={TLVState.series}
      type='bar'
      width='650'
      height='400'
    />
  );
}

export default TypesLocationsvisitedChart;