import { useState, useEffect } from "react";
import { KEY } from "./App";
import StarRating from "./StarRating";

export function MovieDetails({
  selectedID,
  onSelectedID,
  onErrorMovieDetails,
  watchedList,
  onWatchedList,
  userRating,
  onUserRating,
}) {
  const [selectedMovie, setSelectedMovie] = useState({});

  useEffect(
    function () {
      const controller = new AbortController();
      const signal = controller.signal;

      async function getMovieDetails() {
        try {
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`,
            { signal: signal }
          );

          if (!res.ok)
            throw new Error("⛔ Movies details could not be found. ⛔");
          const data = await res.json();

          setSelectedMovie(data) && setSelectedMovie({});
          onErrorMovieDetails("");

          return () => controller.abort();
        } catch (err) {
          onErrorMovieDetails(err.message);
        }
      }

      getMovieDetails();
    },
    [selectedID, onErrorMovieDetails]
  );

  const wasWatched = watchedList
    .map((movie) => movie.imdbID)
    .includes(selectedID);

  return (
    <div className="movie-details">
      <button className="arrow-button" onClick={() => onSelectedID("")}>
        &larr;
      </button>
      <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
      <h3>{selectedMovie.Title}</h3>
      {!wasWatched ? (
        <StarRating
          totalNumberOfStars={10}
          userRating={userRating}
          onUserRating={onUserRating}
          key={selectedMovie.id}
          selectedMovie={selectedMovie}
          watchedList={watchedList}
        />
      ) : (
        <p>You've rated this movie. </p>
      )}
      <p>Year: {selectedMovie.Year}</p>
      <p>Runtime: {selectedMovie.Runtime}</p>
      <p>Genre: {selectedMovie.Genre}</p>
      <p>IMDb rating: {selectedMovie.imdbRating}</p>
      <p>{selectedMovie.Plot}</p>
      <button
        className="add-to-list-button"
        onClick={() => onWatchedList(selectedMovie)}
      >
        {wasWatched ? "Added" : "Add to list"}
      </button>
    </div>
  );
}
