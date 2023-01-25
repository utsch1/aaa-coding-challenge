import './App.css';
import { useEffect, useState } from 'react';

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
          <img src={club.image} alt="logo" />
          <p>{club.name}</p>
          <p>{club.country}</p>
          <p>{club.value}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
