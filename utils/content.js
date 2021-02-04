export const clearExcerptHellip = (str) => {
  return str.replace(/(\[(&hellip;)\])<\/.>/, '$2');
};

export const getLessContent = (str) => {
  return str.length < 800 ? str : str.substring(0, 800);
};

export const cleanTitle = (str) => {
  return str.replace(/^Private:\s?/, '');
};

export const formatMenuData = (arr) => {
  const links = arr.filter((a) => a.isPro === false || !a.isPro);
  const proLinks = arr.filter((a) => a.isPro === true);
  return [links, proLinks];
};
