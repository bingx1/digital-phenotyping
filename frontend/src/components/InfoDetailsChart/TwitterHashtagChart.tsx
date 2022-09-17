import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import styled from 'styled-components';
import COLORS from '../../constant/Colors';
import { Log } from '../common/Logger';
import axios from 'axios'; 
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
  const [options, setOptions] = useState({})
  const [series, setSeries] = useState([])
  
  const [startDateVal, setStartDateVal] = useState(1641634738549)
  const [endDateVal, setEndDateVal] = useState(1641901876549)
  
  const fetchData = () => { 
    // @ts-ignore
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    console.log(startDateVal)
    console.log(endDateVal)
    axios
      .post(
        'https://digital-phenotyping.herokuapp.com/twitterDataServer/twitterWordCloud',
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
        Log('Fetched hashtag data..', response.data);
        let chart = dummyChartData
        let resData = response.data.data
        let categories = [] as any[];
        let newSeries = [];

        for(const [key , val] of Object.entries<any>(resData)){
          categories.push(key);
          newSeries.push(val);
        }

        
        chart.options.labels = categories;
        chart.series = newSeries;
        setOptions(pre => ({
          ...pre,
          //@ts-ignore
          labels: categories
        }))
        //@ts-ignore
        setSeries([ ...newSeries]) 
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
        options={options}
        series={series}
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