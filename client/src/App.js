
import {useState, useEffect} from 'react';
import './App.css';

import MovieCard from './components/MovieCard';
import Stats from './components/Stats'


function App() {
  const [index, setIndex] = useState({})
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function getIndexPage() {
     //fetch the index
     await fetch('http://localhost:8000/catalog')
     .then((response) => response.json())
  
     //set the index to the fetched data, will be used for the Stats box and the title
     .then((data) => setIndex(data))
   }
    getIndexPage()
  }, [])

  useEffect(() => {
    getMovies()
  }, [movies.length])


  async function getMovies() {
    //fetch a list of titles
    await fetch('http://localhost:8000/catalog/titles')
    .then((response) => response.json())

    //set the movies to the fetched data, will be mapped onto movie cards
    .then((data) => setMovies(data["title_list"]))
  }

  

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSubmit = () => {
    fetch(`http://localhost:8000/catalog/search?query=${search}`)
    .then(response => response.json())
    .then((data) => console.log(data))
  }


  
  return (
    <div className="App">
      <h1 className='title'>{index.title}</h1>
      
      <input 
          className='search-bar'
          onChange={handleChange}
      />
      <button 
        className='submit-btn'
        onClick={handleSubmit}
      >
        submit
      </button>
      {movies.map((movie, i) => {
        return <MovieCard 
                key={i}
                title={movie.title}
                summary={movie.summary}
                genre={movie.genre}
                director={movie.director}
                language={movie.language}
                year={movie.year}
                /> 
      })}
      <Stats index={index} />
    </div>
  );
}

export default App;
