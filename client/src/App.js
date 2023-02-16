import {useState} from 'react';
import './App.css';

import MovieList from './components/MovieList';
import Search from './components/Search';


function App() {
  const [movies, setMovies] = useState([])

  

  return (
    <div className="App">
      <Search />
      <MovieList />
    </div>
  );
}

export default App;
