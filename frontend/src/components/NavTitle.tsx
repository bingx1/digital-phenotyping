import React from 'react';
import styled from 'styled-components';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import COLORS from '../constant/Colors';

function NavTitle(props: any) {
  return (
    <NavTitleContainer>
      {props.showArrowBack && <ArrowBackRoundedIcon fontSize='large' />}
      <NavTitleText>{props.title}</NavTitleText>
    </NavTitleContainer>
  );
}

const NavTitleContainer = styled.div`
  align-items: center;
  display: flex;
  color: ${COLORS.text};
  flex-direction: row;
`;
const NavTitleText = styled.div`
  font-size: 30px;
  width: 350px;
  font-family: 'Open Sans', sans-serif;
  margin-left: 20px;
  font-weight: bold;
`;
export default NavTitle;
