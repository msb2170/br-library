

import {useState, useEffect} from 'react';
import './App.css';

import MovieCard from './components/MovieCard';
import Stats from './components/Stats'


function App() {
  const [index, setIndex] = useState({})
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState('')
  const [movie, setMovie] = useState({})
  const [loading, setLoading] = useState(true)

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

  const handleSubmit = (e) => {
    setSearch(e.target.value)
    setLoading(false)
    fetch(`http://localhost:8000/catalog/search?query=${search}`)
    .then(response => response.json())
    .then((data) => setMovie(data))
  }

  const handleSave = () => {
    const newMovie = {...movie};

    fetch('http://localhost:8000/catalog/title', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(newMovie)
    })
    .catch(err => console.log(err))
    
    getMovies()
  }

  const handleDelete = (id) => {
    console.log(id)
    fetch(`http://localhost:8000/catalog/title/${id}`, {
      method: "DELETE"
    })
    const newMovies = movies.filter(movie => movie.id !== id)
    setMovies(newMovies)
    getMovies()
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
      { !loading &&
        <div>
        <h2>Search Result:</h2>
        <h3>{movie.Title}</h3>
        <img src={movie.Poster} alt="movie poster" />
        <h4><em>{movie.Director}</em></h4>
        <h4>{movie.Year}</h4>
        <h4>{movie.Genre}</h4>
        <h4>{movie.Language}</h4>
        <p>{movie.Plot}</p>
        <button 
        className='submit-btn'
        onClick={handleSave}
        >
          Save to Collection
          </button>
      </div>}
      {movies.map((movie, i) => {
        return <MovieCard 
                key={i}
                title={movie.title}
                summary={movie.summary}
                genre={movie.genre}
                director={movie.director}
                language={movie.language}
                year={movie.year}
                poster={movie.poster}
                handleDelete={() => handleDelete(movie._id)}
                id={movie._id}
                /> 
      })}
      {/* <Stats index={index} /> */}

    </div>
  );
}

export default App;
