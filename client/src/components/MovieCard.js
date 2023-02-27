
export default function MovieCard({title, director, summary, genre, year, language}) {
    return (
        <div>
            <h1>{title}</h1>
            <h3><em>{director}</em></h3>
            <h4>{year}</h4>
            <h4>{genre}</h4>
            <h4>{language}</h4>
            <p>{summary}</p>
            <button>save to collection</button>
            <button>x</button>
        </div>
    )
}