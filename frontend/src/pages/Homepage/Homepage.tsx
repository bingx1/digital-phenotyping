import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from '../../../src/assets/senpsi_logo.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button, { ButtonProps } from '@mui/material/Button';
import NavTitle from '../../components/common/NavTitle';
import NameAvatar from '../../components/common/NameAvatar';
import SearchBar from '../../components/common/SearchBar';
import MUIDataTable from 'mui-datatables';
import InfoSumCard from '../../components/common/InfoSumCard';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import COLORS from '../../constant/Colors';
const muiCache = createCache({
  key: 'mui-datatables',
  prepend: true,
});

const dummyData = [['Gabby George', 'Dr', 23, 'Normal', '2022-03-22', '2123']];
export default function Homepage() {
  let navigate = useNavigate();
  const [clientData, setClientData] = useState(dummyData);

  let token = sessionStorage.getItem('userInfo');

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, []);

  const columns = [
    {
      name: 'Name',
      options: {
        customHeadLabelRender: () => <TableHeader>Name</TableHeader>,
      },
    },
    {
      name: 'Title',
      options: {
        customHeadLabelRender: () => <TableHeader>Title</TableHeader>,
      },
    },
    {
      name: 'Age',
      options: {
        customHeadLabelRender: () => <TableHeader>Name</TableHeader>,
      },
    },
    {
      name: 'Status',
      options: {
        customHeadLabelRender: () => <TableHeader>Status</TableHeader>,
      },
    },
    {
      name: 'Last update',
      options: {
        customHeadLabelRender: () => <TableHeader>Last update</TableHeader>,
      },
    },
    {
      name: 'Action',
      options: {
        filter: false,
        sort: false,
        empty: true,
        customHeadLabelRender: () => <TableHeader>Action</TableHeader>,
        customBodyRenderLite: (dataIndex: any, rowIndex: any) => {
          return (
            <ViewBtn
              variant="contained"
              onClick={() => navigate('/infodetailspage', { state: { id: clientData[dataIndex] } })}
            >
              View
            </ViewBtn>
          );
        },
      },
    },
  ];
  const addClient = () => {
    navigate('/addclientpage');
  };
  const HeaderElements = () => {
    return (
      <Button  onClick={addClient} variant='contained' color='info'>
        Add Client
      </Button>
    );
  };
  return (
    <MainContainer>
      <Header>
        <Logo src={logo} alt='logo' />
        <Spacer />
        <NavTitle title='Client Management' showArrowBack={false} />
        <SearchBar />
        <Spacer />
        <NameAvatar />
      </Header>
      <SubInfoContainer>
        <InfoSumCard title={'Total Clients'} />
        <InfoSumCard title={'Unique Visitors'} />
        <InfoSumCard title={'Social Media Apps'} />
      </SubInfoContainer>
      <CacheProvider value={muiCache}>
        <TableContainer>
          <MUIDataTable
            title={'Clients'}
            data={clientData}
            columns={columns}
            options={{
              selectableRows: 'none',
              customToolbar: () => <HeaderElements />,
            }}
          />
        </TableContainer>
      </CacheProvider>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  color: black;
  font-size: 32px;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;
const TableHeader = styled.div`
  font-weight: bolder;
`;
const Header = styled.div`
  width: 80vw;
  
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Logo = styled.img`
  height: 60px;
`;
const Spacer = styled.div`
  height: 20px;
  width: 18px;
`;
const SubInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 1000px;
  margin-bottom: 40px;
`;
const TableContainer = styled.div`
  width: 1000px;
`;
const ViewBtn = styled(Button)`
  color: ${COLORS.white};
  background-color: ${COLORS.light_purple};
  &:hover {
    background-color: ${COLORS.primary};
  }
`;
