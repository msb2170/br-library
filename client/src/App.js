import {useState, useEffect} from 'react';
import './App.css';

import MovieCard from './components/MovieCard';
import Stats from './components/Stats'


function App() {
  const [index, setIndex] = useState({})
  const [movies, setMovies] = useState([])

  const getIndexPage = () => {
    //fetch the index
    fetch('http://localhost:8000/')
    .then((response) => response.json())

    //set the index to the fetched data, will be used for the Stats box and the title
    .then((data) => setIndex(data))
  }

  const getMovies = () => {
    //fetch a list of titles
    fetch('http://localhost:8000/titles')
    .then((response) => response.json())

    //set the movies to the fetched data, will be mapped onto movie cards
    .then((data) => setMovies([data]))
  }

  useEffect(() => {
    getIndexPage()
    getMovies()
  }, [])

  console.log(index)
  console.log(movies)
  
  return (
    <div className="App">
      <h1 className='title'>{index.title}</h1>
      {/* <Stats index={index} />
      {movies.map((movie, i) => {
        return <MovieCard 
                key={i}
                title={movie.title}
                /> 
      })} */}
    </div>
  );
}

export default App;
