import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { BASE_URL } from '../../constant/Endpoint';
import COLORS from '../../constant/Colors';
import DateRangeSelector from '../common/DateRangeSelector';
import ChartContainer from '../common/ChartContainer';

// dummy data for Calls trace
const dummyCallsTrace = {
  options: {
    series: [{ data: [] as any[] }],
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        distributed: true,
      },
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: [] as any[],
      title: {
        text: 'Hours of usage',
        style: {
          fontSize: '13px',
          fontWeight: 200,
          color: `${COLORS.text_2}`,
          cssClass: 'apexcharts-xaxis-label',
        },
      },
    },
    title: {
      text: 'SMS Trace',
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
  },
};

function SmsTraceChart(props: any) {
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([] as any[]);
  const [hasData, setHasData] = useState(false);
  const [startDateVal, setStartDateVal] = useState(1641634738549);
  const [endDateVal, setEndDateVal] = useState(1641901876549);

  const fetchData = () => {
    // @ts-ignore
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

    axios
      .post(
        BASE_URL + '/sms/smsTrace',
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
        console.log('Fetched sms trace data..', response.data);
        let res = dummyCallsTrace;
        let count = response.data.count;
        let trace = response.data.trace;
        if (count.length === 0) {
          setHasData(false);
        } else {
          setOptions((pre) => ({
            ...pre,
            ...dummyCallsTrace.options,
            xaxis: {
              //@ts-ignore
              ...pre.xaxis,
              categories: trace,
            },
          }));
          //@ts-ignore
          setSeries([...[{ data: count }]]);
          setHasData(true);
        }
      });
  };
  useEffect(() => {
    fetchData();
  }, [startDateVal]);

  return (
    <ChartContainer>
      <div className='data-wrapper'>
        <DateRangeSelector setStartDate={setStartDateVal} setEndDate={setEndDateVal} />
      </div>
      {hasData ? (
        <Chart
          //@ts-ignore
          options={options}
          series={series}
          type='bar'
          width='650'
          height='400'
        />
      ) : (
        <div>
          SMS Trace <br></br>No data available.
        </div>
      )}
    </ChartContainer>
  );
}

export default SmsTraceChart;
