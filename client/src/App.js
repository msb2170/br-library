
import {useState, useEffect} from 'react';
import './App.css';

import MovieCard from './components/MovieCard';


function App() {
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState('')
  const [movie, setMovie] = useState({})
  const [loading, setLoading] = useState(true)

  async function getMovies() {
    //fetch a list of titles
    await fetch('https://br-library-backend.vercel.app/catalog/titles')
    .then((response) => response.json())

    //set the movies to the fetched data, will be mapped onto movie cards
    .then((data) => setMovies(data["title_list"]))
  }
  useEffect(() => {
    getMovies()
    return
  }, [movies])



  

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    setSearch(e.target.value)
    setLoading(false)
    fetch(`https://br-library-backend.vercel.app/catalog/search?query=${search}`)
    .then(response => response.json())
    .then((data) => setMovie(data))
  }

  const handleSave = () => {
    const newMovie = {...movie};

    fetch('https://br-library-backend.vercel.app/catalog/title', {
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
    fetch(`https://br-library-backend.vercel.app/catalog/title/${id}`, {
      method: "DELETE"
    })
    const newMovies = movies.filter(movie => movie.id !== id)
    setMovies(newMovies)
    getMovies()
  }
  
  return (
    <div className="App">
      <h1 className='title'>Blu-Ray Library</h1>
      <h4>Number of Titles in Collection: {movies.length}</h4>
      <input 
          className='search-bar'
          onChange={handleChange}
      />
      <button 
        className='submit-btn'
        onClick={handleSubmit}
      >
        search
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
      <div className='card-container'>
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
      </div>

    </div>
  );
}

export default App;
