const PRO_POSTS_ENABLED = process.env.NEXT_PUBLIC_PRO_ENABLED === 'true';

export const statusFilter = () => {
  if (PRO_POSTS_ENABLED) {
    return 'publish, private';
  }
  return 'publish';
};

// eslint-disable-next-line import/prefer-default-export
export const articlesFilter = (isPreview, previewData) => {
  if (!isPreview) {
    return {
      params: {
        status: statusFilter(),
      },
    };
  }

  if (isPreview) {
    return {
      id: previewData?.id,
      params: {
        status: 'any',
      },
    };
  }

  return {};
};

export const searchFilter = (params) => {
  return {
    params: {
      search: params?.query,
      status: statusFilter(),
    },
  };
};
