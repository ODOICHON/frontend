const getImageUrls = (contents: string) => {
  const sources = [];
  const imgRegex = /(<img[^>]src\s=\s["']?([^>"']+)["']?[^>]>)/g;
  let match = imgRegex.exec(contents);
  while (match !== null) {
    sources.push(match[2]);
    match = imgRegex.exec(contents);
  }
  return sources;
};

export default getImageUrls;
