import { getACFImageSizes } from 'utils/media';

// eslint-disable-next-line import/prefer-default-export
export const convertTool = (item) => {
  const url = new URL(item.link);

  return {
    ...item,
    link: url.pathname,
    ...(item?.acf?.logo && {
      logo: {
        ...item?.acf?.logo,
        sizes: getACFImageSizes(item?.acf?.logo?.sizes),
      },
    }),
    ...(item?.acf?.icon && {
      icon: item?.acf?.icon,
    }),
    ...(item?.acf?.banner_image && {
      bannerImage: {
        ...item?.acf?.banner_image,
        sizes: getACFImageSizes(item?.acf?.banner_image?.sizes),
      },
    }),
    ...(item?.acf?.background_image && {
      backgroundImage: {
        ...item?.acf?.background_image,
        sizes: getACFImageSizes(item?.acf?.background_image?.sizes),
      },
    }),
  };
};