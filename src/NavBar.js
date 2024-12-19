export default function NavBar({ query, setQuery, movies }) {
  function handleSetQuery(query) {
    setQuery(query);
  }

  function handleFocusSearchBar() {
    setQuery("");
  }

  return (
    <div className="navBar">
      <h2>myMovieList</h2>

      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => handleSetQuery(e.target.value)}
        onFocus={handleFocusSearchBar}
      />

      <strong>{movies?.Search?.length ?? 0} results</strong>
    </div>
  );
}
