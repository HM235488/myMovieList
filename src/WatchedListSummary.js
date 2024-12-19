export function WatchedListSummary({ watchedList, userRating }) {
  // if (watchedList.length > 1)
  const totalTime = watchedList.reduce(
    (sum, movie) => sum + parseInt(movie.Runtime),
    0
  );

  const totalOmdbRating = watchedList.reduce(
    (sum, movie) => sum + parseInt(movie.imdbRating),
    0
  );

  const totalUserRating = watchedList.reduce(
    (sum, movie) => sum + movie.userRating,
    0
  );

  function calcAverage(total) {
    return total / watchedList.length;
  }

  return (
    <div className="header-summary">
      <h4>YOUR MOVIES LIST</h4>
      <div className="summary">
        <p>#️⃣ {watchedList.length}</p>
        <p>
          ⭐
          {watchedList.length === 0
            ? 0
            : calcAverage(totalOmdbRating).toFixed(2)}
        </p>
        <p>
          🌟{" "}
          {watchedList.length === 0
            ? 0
            : calcAverage(totalUserRating).toFixed(2)}
        </p>
        <p>
          ⏳{watchedList.length === 0 ? 0 : calcAverage(totalTime).toFixed(0)}
          min
        </p>
      </div>
    </div>
  );
}
