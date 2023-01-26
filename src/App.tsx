import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Club from './components/Club';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Club />} />
      </Routes>
    </Router>
  );
}

export default App;
