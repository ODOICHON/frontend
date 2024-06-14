const getNotUsedImageUrl = (origin: string[], final: string[]) => {
  return origin.filter((url) => !final.includes(url));
};

export default getNotUsedImageUrl;
