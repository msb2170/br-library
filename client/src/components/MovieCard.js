
export default function MovieCard({title, director, summary, genre, year, language, poster, handleDelete}) {
    return (
        <div className="card">
            <h1 className='card-title'>{title}</h1>
            <button className="card-remove-btn" onClick={handleDelete}>x</button>
            <img alt="movie poster" src={poster} className='card-img'/>
            <h3 className="card-info"><em>{director}</em></h3>
            <h4 className="card-info">{year}</h4>
            <h4 className="card-info">{genre}</h4>
            <h4 className="card-info">{language}</h4>
            <p className="card-info">{summary}</p>
        </div>
    )
}