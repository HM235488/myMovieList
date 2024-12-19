export function WatchedList({ watchedList, onDeleteMovie }) {
  return (
    <>
      {watchedList.map((watchedMovie) => (
        <div key={watchedMovie.imdbID} className="watched-movie">
          <button
            className="btn-delete-movie"
            onClick={() => onDeleteMovie(watchedMovie.imdbID)}
          >
            &times;
          </button>

          <img src={watchedMovie.Poster} alt={watchedMovie.Title} />
          <div>
            <h3>{watchedMovie.Title}</h3>
            <div>
              <p>⭐ {watchedMovie.imdbRating}</p>
              <p>🌟 {watchedMovie.userRating}</p>
              <p>⏳ {watchedMovie.Runtime}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
