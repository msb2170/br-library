

export default function Stats({index}) {
    return (
        <div className="stats-box">
            <h3>Stats</h3>
            <p>Titles: {index.data.title_count}</p>
            <p>Directors: {index.data.director_count}</p>
            <p>Languages: {index.data.language_count}</p>
            <p>Genres: {index.data.genre_count}</p>
        </div>
    )
}