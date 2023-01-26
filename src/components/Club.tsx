import { Image } from '@mui/icons-material';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Club = () => {
  const [data, setData] = useState<any[]>();
  const { id } = useParams();
  const footballClub = data?.find((singleClub) => singleClub.id === id);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  console.log(footballClub);

  // fetch single Club from API

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(
          'https://public.allaboutapps.at/hiring/clubs.json',
        );
        const json = await result.json();
        setData(json);
      } catch (err) {
        throw err;
      }
    };
    fetchData().catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Box>
        <AppBar position="fixed" sx={{ height: '60px', background: '#01C13B' }}>
          <Toolbar sx={{ display: 'flex' }}>
            <Button onClick={goBack}>
              <ArrowBackOutlinedIcon sx={{ pr: '50px', color: 'white' }} />
            </Button>
            <Typography sx={{ fontWeight: 'bold' }}>
              {footballClub?.name}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        sx={{
          mt: '60px',
          backgroundColor: '#202020',
          height: '200px',
          pl: '30px',
        }}
      >
        <Typography
          component="h1"
          color="white"
          fontWeight="bold"
          display="flex"
          alignItems="end"
        >
          {footballClub?.country}
        </Typography>
        <Box
          component="img"
          src={footballClub?.image}
          alt="logo"
          display="flex"
          sx={{ m: 'auto', width: '150px', height: 'auto' }}
        />
      </Box>
      <Box sx={{ p: '30px' }}>
        <Typography sx={{ pb: '40px' }}>
          Der Club{' '}
          <Box component="span" fontWeight="bold">
            {footballClub?.name}
          </Box>{' '}
          aus {footballClub?.country} hat einen Wert von {footballClub?.value}{' '}
          Millionen Euro.
        </Typography>
        <Typography>
          <Box component="span" fontWeight="bold">
            {footballClub?.name}
          </Box>{' '}
          konnte bislang {footballClub?.european_titles} Siege auf europäischer
          Ebene erreichen.
        </Typography>
      </Box>
    </>
  );
};

export default Club;
