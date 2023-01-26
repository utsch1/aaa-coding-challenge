import SortIcon from '@mui/icons-material/Sort';
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [data, setData] = useState([]);

  const [order, setOrder] = useState<any>();

  interface Clubs {
    id: string;
    name: string;
    country: string;
    value: number;
    image: string;
    europeanTitles: number;
    stadium: { size: number; name: string };
    location: { lat: number; lng: number };
  }
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

  // sorting function:
  function dynamicSort(property: any) {
    var sortOrder = 1;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a: any, b: any) {
      if (sortOrder == -1) {
        return b[property].localeCompare(a[property]);
      } else {
        return a[property].localeCompare(b[property]);
      }
    };
  }
  // const orderByName = data.sort(dynamicSort('name'));
  // const orderByValue = data.sort((v1, v2) =>
  //   v1.value < v2.value ? 1 : v1.value > v2.value ? -1 : 0,
  // );

  function changeOrder() {
    if (order === 'name') {
      setOrder(
        data.sort((v1: any, v2: any) =>
          v1.value < v2.value ? 1 : v1.value > v2.value ? -1 : 0,
        ),
      );
    } else {
      setOrder(data.sort(dynamicSort('name')));
    }
  }
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
                onClick={changeOrder}
              />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ mt: '60px' }} />
      {data.map((club: Clubs) => (
        <Box key={club.id}>
          <Link href={`/${club.id}`} underline="none" color="text.primary">
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
          </Link>
        </Box>
      ))}
    </>
  );
};

export default Home;
