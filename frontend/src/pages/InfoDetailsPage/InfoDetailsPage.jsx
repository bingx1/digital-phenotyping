import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
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
import AppUsageChart from '../../components/InfoDetailsChart/AppUsageChart';
import { Divider } from '@mui/material';
import SmsUsageChart from '../../components/InfoDetailsChart/SmsUsageChart';

function InfoDetailsPage() {
  const [patientId, setPatientId] = useState('123');
  const [curSelected, setCurSelected] = useState('');
  const selected = (name) => {
    Log(name);
    setCurSelected(name);
  };
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
          <AppUsageChart />
          <Spacer />
          <Divider style={{background: 'black'}} sx={{borderBottomWidth: 1.5}} />
          <Spacer />
          <SmsUsageChart />
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