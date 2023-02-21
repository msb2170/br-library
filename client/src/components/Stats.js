
export default function Stats(props) {
    return (
        <div className="stats-box">
            <h3>Stats</h3>
            <p>Titles: {props.index.data.title_count}</p>
            <p>Directors: {props.index.data.director_count}</p>
            <p>Languages: {props.index.data.language_count}</p>
            <p>Genres: {props.index.data.genre_count}</p>
        </div>
    )
}