
export default function MovieCard({title, director, summary, genre, year, language, poster, handleDelete}) {
    return (
        <div>
            <h1>{title}</h1>
            <img alt="movie poster" src={poster} />
            <h3><em>{director}</em></h3>
            <h4>{year}</h4>
            <h4>{genre}</h4>
            <h4>{language}</h4>
            <p>{summary}</p>
            <button onClick={handleDelete}>x</button>
        </div>
    )
}