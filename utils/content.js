import sortBy from 'lodash/sortBy';

const PRO_LINKS_PRE_DEFINED_ORDER = [
  'Step-by-step instructions',
  'User support questions',
  'Additional materials',
];

export const clearExcerptHellip = (str) => {
  return str.replace(/(\[(&hellip;)\])<\/.>/, '$2');
};

export const getLessContent = (str) => {
  return str.length < 800 ? str : str.substring(0, 800);
};

export const cleanTitle = (str) => {
  return str.replace(/^Private:\s?/, '');
};

// XXX: This is not a beautiful fix, but as wordpress gives us back the links randomly,
// it gives us some tmp control. Also as these pro links are only available in one place it's not a big deal for now.
export const sortProLinks = (items) => {
  return sortBy(items, (item) => {
    const index = PRO_LINKS_PRE_DEFINED_ORDER.indexOf(item.label);
    // XXX: If we get back articles that are not defined, push them to the end of the stack
    return index === -1 ? items.length + 1 : index;
  });
};

export const formatMenuData = (arr) => {
  const links = arr.filter((a) => a.isPro === false || !a.isPro);
  const proLinks = sortProLinks(arr.filter((a) => a.isPro === true));
  return [links, proLinks];
};
