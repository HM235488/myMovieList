import { useState } from "react";

const filled = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path
      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      fill="rgb(253, 204, 13)"
    />
  </svg>
);

const empty = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path
      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      fill="none"
      stroke="rgb(253, 204, 13)"
      strokeWidth="2"
    />
  </svg>
);

export default function StarRating({
  totalNumberOfStars,
  userRating,
  onUserRating,
  selectedMovie,
  watchedList,
}) {
  const [temporaryRating, setTemporaryRating] = useState(0);

  function handleTemporaryRating(index) {
    setTemporaryRating(index + 1);
  }

  function handleUserRating(index) {
    onUserRating(index + 1);
  }

  const arrOfStars = Array.from({ length: totalNumberOfStars }, (_, i) =>
    temporaryRating && i < temporaryRating
      ? filled
      : temporaryRating === 0 && i < userRating
      ? filled
      : empty
  );

  selectedMovie.userRating = userRating;

  return (
    <>
      {arrOfStars.map((star, i) => (
        <span
          key={i}
          id={i}
          onClick={() => handleUserRating(i)}
          onMouseEnter={() => handleTemporaryRating(i)}
          onMouseLeave={() => handleTemporaryRating(-1)}
        >
          {star}
        </span>
      ))}
    </>
  );
}
