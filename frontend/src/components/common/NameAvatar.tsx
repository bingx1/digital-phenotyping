import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import COLORS from '../../constant/Colors';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

function NameAvatar() {
  const [name, setName] = useState('');
  useEffect(() => {
    let userInfo = sessionStorage.getItem('userInfo');
    if (userInfo !== null) {
      userInfo = JSON.parse(userInfo);
    }
    //@ts-ignore
    let name = userInfo!.clinician_info.first_name + ' ' + userInfo!.clinician_info.last_name;
    setName(name);
  });
  return (
    <Container>
      <Name>{name}</Name>
      <Avatar>
        <SupportAgentIcon sx={{ fontSize: 50 }} />
      </Avatar>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  width: 300px;
  margin-left: 100px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
const Name = styled.div`
  min-width: 150px;
  text-overflow: ellipsis;
  font-size: 30px;
  font-weight: 700;
  font-family: 'Open Sans', sans-serif;
  color: ${COLORS.text};
`;
const Avatar = styled.div`
  height: 60px;
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  color: ${COLORS.primary};
  box-shadow: 1px 1px 4px 2px ${COLORS.shadow};
  border-radius: 30px;
  background-color: ${COLORS.white};
`;
export default NameAvatar;
