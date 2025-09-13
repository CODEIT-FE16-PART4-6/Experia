const formatRating = (rating: number) => {
  if (rating % 1) {
    return `${Math.trunc(rating * 10) / 10}`;
  } else {
    return `${rating}.0`;
  }
};

export default formatRating;
