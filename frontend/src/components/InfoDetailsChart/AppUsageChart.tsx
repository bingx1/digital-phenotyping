import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import styled from 'styled-components';
import COLORS from '../../constant/Colors';
import { Log } from '../common/Logger';
import axios from 'axios';
import { DateRangePicker, Stack } from 'rsuite';
import subDays from 'date-fns/subDays';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import addDays from 'date-fns/addDays';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import addMonths from 'date-fns/addMonths';  
import DateRangeSelector from '../common/DateRangeSelector';
// dummy data for app time usage
const dummyChartData = {
  options: {
    title: {
      text: 'App Times Used',
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
    chart: { 
      width: 380,
      type: 'pie',
    }, 
    labels: [] as any[], 
  },
  series: [] as any[],
}; 

function AppUsageChart(props: any) {
  const [barState, setBarState] = useState({
    options: {},
    series: [],
  });
  const [startDateVal, setStartDateVal] = useState(1641634738549)
  const [endDateVal, setEndDateVal] = useState(1641901876549)
  const fetchData = () => {
    let curDate = new Date();
    // @ts-ignore
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    console.log(startDateVal)
    console.log(endDateVal)
    axios
      .post(
        'https://digital-phenotyping.herokuapp.com/appForeground/',
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
        Log('Fetched data..', response.data);
        let res = dummyChartData;
        let categories = [];
        let series = [];
        for (let i = 0; i < response.data[0].length; i++) {
          if (response.data[1][i] >= 1) {
            categories.push(response.data[0][i]);
            series.push(Math.round(response.data[1][i] * 100) / 100);
          }
        }
        
        res.options.labels = categories;
        res.series = series;
        // @ts-ignore
        setBarState(pre => ({...pre,...res}));
      });
  };
  useEffect(() => {
    Log('App usage chart...');
    fetchData();
    //setBarState(dummyChartData);
  }, [startDateVal]);
 
  return (
    <Container>
      <DateWrapper>
        <DateRangeSelector setStartDate={setStartDateVal} setEndDate={setEndDateVal} />
      </DateWrapper>

      <Chart
        options={barState.options}
        series={barState.series}
        type='pie'
        width='600'
        height='400'
      />
    </Container>
  );
}

export default AppUsageChart;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const DateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Title = styled.div`
  font-size: 15px;
  padding-right: 30px;
  color: ${COLORS.text};
`
