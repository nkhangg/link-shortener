export const genShortUrl = (data: IShortenedUrl) => {
  const url = window.location.href;

  return `${url}short/${data.id}`;
};
