import Movie from "./Movie";

export function MovieList({ movies, selectedID, onSelectedID }) {
  return (
    <ul>
      {movies?.Search?.map((movie) => (
        <Movie
          key={movie.imdbID}
          movie={movie}
          selectedID={selectedID}
          onSelectedID={onSelectedID}
        />
      ))}
    </ul>
  );
}
