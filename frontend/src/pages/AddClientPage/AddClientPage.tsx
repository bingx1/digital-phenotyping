import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NavTitle from '../../components/common/NavTitle';
import SearchBar from '../../components/common/SearchBar';
import NameAvatar from '../../components/common/NameAvatar';
import COLORS from '../../constant/Colors'; 
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios'; 
import { Log } from '../../components/common/Logger';
import { Snackbar, Alert } from '@mui/material';

function InfoDetailsPage() {
  let navigate = useNavigate();
  let location = useLocation();
  const [clientTitle, setClientTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [textNotes, setTextNotes] = useState('');
  const [twitterId, setTwitterId] = useState('');
  const [facebookId, setFacebookId] = useState('');
  const [awareId, setAwareId] = useState('');
  const [showSuccessBar, setShowSuccessBar] = useState(false)
  const [showErrorBar, setShowErrorBar] = useState(false)


  const handleClientTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClientTitle(event.target.value);
  };
  const handleFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };
  const handleLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };
  const handleTextNotes = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextNotes(event.target.value);
  };
  const handleTwitterId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTwitterId(event.target.value);
  };
  const handleFacebookId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFacebookId(event.target.value);
  };
  const handleAwareId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAwareId(event.target.value);
  };

  // @ts-ignore
  let clinicianInfo = JSON.parse(sessionStorage.getItem('userInfo'));

  useEffect(() => {
    console.log(location.state);

    if (!clinicianInfo) {
      navigate('/');
    }
  }, []);

  const closeSuccessBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSuccessBar(false);
  };

  const closeErrorBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowErrorBar(false);
  };

  const addClient = () =>{
    console.log(clientTitle)
    console.log(firstName)
    console.log(lastName)
    console.log(dateOfBirth!.toISOString().substring(0,10))
    console.log(textNotes)
    console.log(twitterId)
    console.log(facebookId)
    axios
      .post('https://digital-phenotyping.herokuapp.com/userServer/AddClient', {
        clinicianId: clinicianInfo.user_info.id,
        clientTitle: clientTitle,
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth!.toISOString().substring(0,10),
        textNotes: textNotes,
        twitterId: twitterId,
        facebookId: facebookId,
        awareDeviceId: awareId,
      },
      {
        headers: {
          Authorization: `Bearer ${clinicianInfo.access}`,
        },
      })
      .then((response) => {
        Log('Fetched Clients data..', response.data);
        if(response.data === 200){
          setShowSuccessBar(true)
        }else{
          setShowErrorBar(true)
        }
        
      })
      .catch((err) => {
        Log(err);
        setShowErrorBar(true)
      });
  }

  const navBack = () => {};

  return (
    <MainContainer>
      <Header onClick={navBack}>
        <Link to='/homepage'>
          <NavTitle title='Add a Client' showArrowBack={true} />
        </Link>
        <SearchBar />
        <Spacer />
        <NameAvatar />
      </Header>
      <CardContainer>
        <TextField value={clientTitle} onChange={handleClientTitle} margin="dense"  placeholder='Dr' label="Client Title" variant="standard" />
        <TextField value={firstName} onChange={handleFirstName} placeholder='Simon'  margin="dense" label="First Name" variant="standard" />
        <TextField value={lastName} onChange={handleLastName} placeholder="D'Alfonso"  margin="dense" label="Last Name" variant="standard" />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
          label="Date of Birth" 
          value={dateOfBirth}
          onChange={(newValue: Date| null) => {
            setDateOfBirth(newValue);
          }}
          inputFormat="yyyy-mm-dd"
          renderInput={(params:any) => <TextField margin="dense" variant="standard" {...params} />}
          />
        </LocalizationProvider>
        {/* <TextField value={dateOfBirth} onChange={handleDateOfBirth} error={dateOfBirthErr}  placeholder='1981-02-30'  margin="dense" label="Date of Birth" variant="standard" /> */}
        <TextField value={textNotes} onChange={handleTextNotes} margin="dense" label="Text Notes" variant="standard" />
        <TextField value={twitterId} onChange={handleTwitterId} placeholder='@sjdalf'  margin="dense" label="Twitter ID" variant="standard" />
        <TextField value={facebookId} onChange={handleFacebookId} placeholder='simon.dalfonso'  margin="dense" label="Facebook ID" variant="standard" />
        <TextField value={awareId} onChange={handleAwareId} placeholder='cf62dfa9-e22d-426f-b5a6-e4f2d72fc66a'  margin="dense" label="AWARE device ID" variant="standard" />
        <BtnContainer>
        <Button fullWidth onClick={addClient} variant='contained' color='info'>
          Add
        </Button>
        </BtnContainer>
      </CardContainer>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={showSuccessBar}
        onClose={closeSuccessBar}
        autoHideDuration={3000}
      >
        <Alert severity='success'>A client has been successfully added!</Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={showErrorBar}
        onClose={closeErrorBar}
        autoHideDuration={3000}
      >
        <Alert severity='error'>Failed to add a client.</Alert>
      </Snackbar>
    </MainContainer>
  );
}
 
const MainContainer = styled.div`
  font-size: 32px;
  padding-left: 5vw;
  display: flex;
  flex-direction: column;
`;
const CardContainer = styled.div`
  background-color: ${COLORS.white};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 15px 1px ${COLORS.shadow};
  width: 500px;
  padding: 30px;
  margin: 20px;
`;
const Header = styled.div`
  width: 80vw;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Spacer = styled.div`
  height: 20px;
  width: 30%;
`; 
const BtnContainer = styled.div`
  width: 120px;
  margin: 20px auto;
`

export default InfoDetailsPage;
