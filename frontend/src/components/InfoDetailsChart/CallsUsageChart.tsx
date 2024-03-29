import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { BASE_URL } from '../../constant/Endpoint';
import COLORS from '../../constant/Colors';
import DateRangeSelector from '../common/DateRangeSelector';
import ChartContainer from '../common/ChartContainer';
import ChartDataWrapper from '../common/ChartDataWrapper';
import { ApexOptions } from 'apexcharts';

// dummy data for Calls usage
const dummyCallsData = {
  series: [] as ApexOptions['series'],
  options: {
    chart: {
      type: 'bar',
      height: 440,
    },
    colors: ['#008FFB', '#FF4560', '#775DD0'],
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'rounded',
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
      text: 'Calls Usage',
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
      categories: [] as string[],
    },
  },
};

function CallsUsageChart(props: ChartProps) {
  const [options, setOptions] = useState(dummyCallsData.options);
  const [series, setSeries] = useState(dummyCallsData.series);

  const [startDateVal, setStartDateVal] = useState(1641634738549);
  const [endDateVal, setEndDateVal] = useState(1641901876549);

  const fetchData = () => {
    // @ts-ignore
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

    axios
      .post(
        BASE_URL + '/callServer/calls',
        {
          uid: props.uid,
          startDate: startDateVal,
          endDate: endDateVal,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo!.access}`,
          },
        }
      )
      .then((response) => {
        console.log('Fetched data..', response.data.data);
        let res = dummyCallsData;
        let data = response.data.data;
        let newSeries = [
          {
            name: 'Incoming',
            data: data[0],
          },
          {
            name: 'Outgoing',
            data: data[1],
          },
          {
            name: 'Missed',
            data: data[2],
          },
        ];
        res.options.xaxis.categories = data[3];
        res.series = newSeries;
        console.log(res.options.xaxis.categories);
        setOptions((pre) => ({
          ...pre,
          xaxis: {
            //@ts-ignore
            ...pre.xaxis,
            categories: data[3],
          },
        }));
        //@ts-ignore
        setSeries([...newSeries]);
      });
  };
  useEffect(() => {
    fetchData();
  }, [startDateVal]);

  return (
    <ChartContainer>
      <ChartDataWrapper>
        <DateRangeSelector setStartDate={setStartDateVal} setEndDate={setEndDateVal} />
      </ChartDataWrapper>
      <Chart
        //@ts-ignore
        options={options}
        series={series}
        type='bar'
        width='650'
        height='400'
      />
    </ChartContainer>
  );
}

export default CallsUsageChart;
