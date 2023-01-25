import './App.css';
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
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
    <div className="App">
      <header className="App-header">
        <p>all about clubs</p>
      </header>
      {data.map((club) => (
        <div key={club.id}>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
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
            <Divider component="li" />
          </List>
        </div>
      ))}
    </div>
  );
}

export default App;
