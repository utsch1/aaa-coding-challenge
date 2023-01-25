import SortIcon from '@mui/icons-material/Sort';
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState<any[]>([]);
  console.log(data);
  // fetch Data from API

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
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 'bold' }}>all about clubs</Typography>
            <IconButton size="large" edge="end">
              <SortIcon
                sx={{
                  color: 'white',
                  background: '#61fe90',
                  borderRadius: '50%',
                  p: '7px',
                }}
                aria-label="sort football clubs"
              />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ mt: '60px' }} />
      {data.map((club) => (
        <Box key={club.id}>
          <List sx={{ width: '100%', bgcolor: 'background.paper', p: '0' }}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="logo" src={club.image} />
              </ListItemAvatar>
              <ListItemText
                primary={club.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                      mr="5px"
                    >
                      {club.country}
                    </Typography>
                    {club.value} Millionen Euro
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider />
          </List>
        </Box>
      ))}
    </>
  );
}

export default App;
