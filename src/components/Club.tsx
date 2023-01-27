import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { AppBar, Box, Button, Grid, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Club = () => {
  const [data, setData] = useState<any[]>();
  const { id } = useParams();
  const footballClub = data?.find((singleClub) => singleClub.id === id);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

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
      <Grid
        container
        display="flex"
        sx={{
          mt: '60px',
          backgroundColor: '#202020',
          height: '200px',
          pl: '30px',
          pr: '30px',
        }}
      >
        <Grid
          item
          component="span"
          position="absolute"
          color="white"
          fontWeight="bold"
          alignSelf="end"
          sx={{ mb: '20px' }}
        >
          {footballClub?.country}
        </Grid>
        <Box
          component="img"
          alignSelf="center"
          justifySelf="center"
          src={footballClub?.image}
          alt="Logo"
          sx={{
            m: 'auto',
            width: 'auto',
            height: '160px',
          }}
        />
      </Grid>
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
