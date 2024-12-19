/* This project is based on the design from Jonas Schmedtmann's course (https://www.udemy.com/course/the-ultimate-react-course/).
The functionality and some elements were inspired by the course project, but the code and implementation are my own. */

import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { MovieList } from "./MovieList";
import { Box } from "./Box";
import { WatchedListSummary } from "./WatchedListSummary";
import { WatchedList } from "./WatchedList";
import { MovieDetails } from "./MovieDetails";

export const KEY = "b211a7fd";

export default function App() {
  const [movies, setMovies] = useState([]); // array of objects
  const [query, setQuery] = useState("");
  const [selectedID, setSelectedID] = useState("");
  const [error, setError] = useState("");
  const [errorMovieDetails, setErrorMovieDetails] = useState("");
  const [watchedList, setWatchedList] = useState([]);
  const [userRating, setUserRating] = useState(0);

  // Unselect
  function handleSelectedID(id) {
    id === selectedID ? setSelectedID("") : setSelectedID(id);
  }

  function handleSetMovies(movies) {
    setMovies(movies);
  }

  // add to watched list
  function handleWatchedList(selectedMovie) {
    if (
      watchedList
        .map((movie) => movie.imdbID)
        .includes(selectedMovie.imdbID) === false
    )
      setWatchedList([...watchedList, selectedMovie]);
  }

  // delete from watched list
  function handleDeleteMovie(id) {
    const list = watchedList.filter((movie) => movie.imdbID !== id);
    setWatchedList(list);
  }

  useEffect(
    function () {
      if (
        watchedList.map((movie) => movie.imdbID).includes(selectedID) === false
      )
        setUserRating(0);
    },
    [selectedID, watchedList]
  );

  useEffect(
    function () {
      const controller = new AbortController();
      const signal = controller.signal;

      async function getMovies() {
        try {
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: signal }
          );
          if (!res.ok) throw new Error("⛔ Failed to find movies. ⛔");

          const data = await res.json();

          // return an empty array if no data were fetched
          handleSetMovies(data) && handleSetMovies([]);
          setError("");

          return () => controller.abort();
        } catch (err) {
          setError(err.message);
        }
      }

      getMovies();
    },
    [query]
  );

  return (
    <div>
      <NavBar query={query} setQuery={setQuery} movies={movies} />
      <div className="main">
        <Box>
          {error && <div>{error}</div>}
          <MovieList
            key={selectedID}
            movies={movies}
            selectedID={selectedID}
            onSelectedID={handleSelectedID}
          />
        </Box>

        <Box>
          {errorMovieDetails && <div>{errorMovieDetails}</div>}
          {!selectedID && (
            <WatchedListSummary
              watchedList={watchedList}
              userRating={userRating}
            />
          )}
          {selectedID && (
            <div>
              <MovieDetails
                selectedID={selectedID}
                onSelectedID={setSelectedID}
                onErrorMovieDetails={setErrorMovieDetails}
                watchedList={watchedList}
                onWatchedList={handleWatchedList}
                userRating={userRating}
                onUserRating={setUserRating}
              />
            </div>
          )}
          {!selectedID && (
            <WatchedList
              watchedList={watchedList}
              onDeleteMovie={handleDeleteMovie}
            />
          )}
        </Box>
      </div>
    </div>
  );
}
