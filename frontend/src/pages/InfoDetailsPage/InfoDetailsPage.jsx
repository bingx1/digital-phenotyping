import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Chart from 'react-apexcharts';
import NavTitle from '../../components/NavTitle';
import SearchBar from '../../components/SearchBar';
import NameAvatar from '../../components/NameAvatar';
import COLORS from '../../constant/Colors';
import CardContainer from '../../components/CardContainer';
import SectionTitle from '../../components/SectionTitle';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import { Log } from '../../components/Logger';
<<<<<<< Updated upstream:frontend/src/pages/InfoDetailsPage/InfoDetailsPage.jsx
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
    fill: {
      colors: [`${COLORS.primary}`],
    },
    chart: {
      id: 'basic-bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    xaxis: {
      categories: [
        'Twitter',
        'Google Map',
        'Facebook',
        'ESPN',
        'Domain Real Estate',
        'Champions League Official',
        'ASUS Weather',
      ],
    },
  },
  series: [
    {
      name: 'Times Used',
      data: [100, 78, 78, 43, 10, 22, 56],
    },
  ],
};
=======
import AppUsageChart from '../../components/InfoDetailsChart/AppUsageChart';
import { Divider } from '@mui/material';
import SmsUsageChart from '../../components/InfoDetailsChart/SmsUsageChart';
import CategoryChart from '../../components/InfoDetailsChart/CategoryChart';
import CallsUsageChart from '../../components/InfoDetailsChart/CallsUsageChart';
import UnlockDurationChart from '../../components/InfoDetailsChart/UnlockDurationChart';
import LocationNumberChart from '../../components/InfoDetailsChart/locationNumberChart';
import LocationNumberChartHeatmap from '../../components/InfoDetailsChart/locationNumberChartHeatmap';
import LocationNumberChartTreemap from '../../components/InfoDetailsChart/locationNumberChartTreemapChart';
>>>>>>> Stashed changes:frontend/src/pages/InfoDetailsPage/InfoDetailsPage.tsx

function InfoDetailsPage() {
  const [patientId, setPatientId] = useState('123');
  const [barState, setBarState] = useState({
    options: {},
    series: [],
  });
  const [curSelected, setCurSelected] = useState('');
  useEffect(() => {
    setBarState(dummyChartData);
  }, []);
  const selected = (name) => {
    Log(name);
    setCurSelected(name);
  };
<<<<<<< Updated upstream:frontend/src/pages/InfoDetailsPage/InfoDetailsPage.jsx
=======

  // chart to show when clicking application button
  const appChart = (
    <ChartContainer>
      <CardContainer>
        <AppUsageChart />
      </CardContainer>
      <CardContainer>
        <CategoryChart />
      </CardContainer>
    </ChartContainer>
  );

  // chart to show when clicking communication button
  const comChart = (
    <ChartContainer>
      <CardContainer>
        <SmsUsageChart />
      </CardContainer>
      <CardContainer>
        <CallsUsageChart />
      </CardContainer>
    </ChartContainer>
  );

  // chart to show when clicking locations button
  const locChart = (
    <ChartContainer>
      <CardContainer>
        <LocationNumberChart />
      </CardContainer>
      <CardContainer>
        <LocationNumberChartHeatmap />
      </CardContainer>
      <CardContainer>
        <LocationNumberChartTreemap />
      </CardContainer>
    </ChartContainer>

  );

  // chart to show when clicking screen button
  const screenChart = (
    <ChartContainer>
      <CardContainer>
        <UnlockDurationChart />
      </CardContainer>
    </ChartContainer>
  );

  const defaultGreeting = (
    <CardContainer>
      <Reminder>Select any type of aware information to see detail chart</Reminder>
    </CardContainer>
  );

  // define the acutal chart that need to show
  let show = (type: string) => {
    switch (type) {
      case 'Applications':
        return appChart;
      case 'Communication':
        return comChart;
      case 'Locations':
        return locChart;
      case 'Screen':
        return screenChart;
      default:
        return defaultGreeting;
    }
  };
  const chartToShow = show(curSelected);
>>>>>>> Stashed changes:frontend/src/pages/InfoDetailsPage/InfoDetailsPage.tsx
  const navBack = () => {};
  return (
    <MainContainer>
      <Header onClick={navBack}>
        <Link to='/loginpage'>
          <NavTitle title='Client Details' showArrowBack={true} />
        </Link>
        <SearchBar />
        <Spacer />
        <NameAvatar />
      </Header>
      <SubContainer>
        <CardContainer>
          <Chart options={barState.options} series={barState.series} type='bar' width='500' />
        </CardContainer>
        <AwareAppsContainer>
          <SectionTitle title={'AWARE Information'} />
          <Grid columnSpacing={{ xs: 1, sm: 2, md: 3 }} container rowSpacing={3}>
            <Grid onClick={() => selected('Applications')} item xs={6}>
              <IconText curSelected={curSelected} name='Applications'>
                <PhonelinkIcon sx={{ fontSize: 80 }} />
                <AppName>Applications</AppName>
              </IconText>
            </Grid>
            <Grid item onClick={() => selected('Communication')} xs={6}>
              <IconText curSelected={curSelected} name='Communication'>
                <ChatRoundedIcon sx={{ fontSize: 80 }} />
                <AppName>Communication</AppName>
              </IconText>
            </Grid>
            <Grid item onClick={() => selected('Locations')} xs={6}>
              <IconText curSelected={curSelected} name='Locations'>
                <LocationOnRoundedIcon sx={{ fontSize: 80 }} />
                <AppName>Locations</AppName>
              </IconText>
            </Grid>
            <Grid item onClick={() => selected('Screen')} xs={6}>
              <IconText curSelected={curSelected} name='Screen'>
                <AccessTimeFilledRoundedIcon sx={{ fontSize: 80 }} />
                <AppName>Screen</AppName>
              </IconText>
            </Grid>
          </Grid>
        </AwareAppsContainer>
      </SubContainer>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  font-size: 32px;
  padding-left: 13vw;
  display: flex;
  flex-direction: column;
`;
const SubContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const AwareAppsContainer = styled.div`
  display: flex;
  margin-left: 100px;
  width: 480px;
  flex-direction: column;
`;
const IconText = styled.div`
  padding: 10px;
  &:hover {
    cursor: pointer;
  }
  color: ${(props) => (props.name === props.curSelected ? COLORS.white : COLORS.text)};
  background-color: ${(props) =>
    props.name === props.curSelected ? COLORS.primary : COLORS.white};
  border-radius: 10px;
  display: flex;
  width: 180px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const AppName = styled.text`
  margin: 10px;
  font-size: 20px;
  font-family: 'Open Sans', sans-serif;
`;
const Header = styled.div`
  width: 100vw;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Spacer = styled.div`
  height: 20px;
  width: 30%;
`;
export default InfoDetailsPage;
