export const genShortUrl = (data: ShortenedUrl) => {
    const url = window.location.href;

    return `${url}short/${data.id}`;
};
