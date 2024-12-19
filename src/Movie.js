export default function Movie({ movie, selectedID, onSelectedID }) {
  return (
    <li
      key={movie.imdbID}
      className="movie"
      onClick={() => onSelectedID(movie.imdbID)}
    >
      <img src={movie.Poster} alt={movie.Title} />
      <div>
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>
    </li>
  );
}
