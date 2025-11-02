const createMenuStructure = ({ parentTools, toolsGrouped, proLinks }) => {
  const menu = parentTools.map((parent) => {
    return {
      id: parent.id,
      link: parent.link,
      slug: parent.slug,
      title: parent.title,
      subsections: [
        ...(!['glossary', 'account'].includes(parent.slug)
          ? [
              {
                id: parent.id,
                link: parent.link,
                slug: parent.slug,
                title: 'Overview',
              },
            ]
          : []),
        ...(toolsGrouped[parent.id]?.map((item) => ({
          id: item.id,
          link: item.link,
          slug: item.slug,
          title: item.title,
        })) || []),
      ],
    };
  });

  menu.forEach((item) => {
    if (item.slug === 'gfw-pro') {
      item.subsections = [
        ...(toolsGrouped[item.id]
          ?.filter((t) => t.status !== 'private')
          .map((i) => ({
            id: i.id,
            link: i.link,
            slug: i.slug,
            title: i.title,
          })) || []),
        ...proLinks.map((i, index) => ({
          id: i.id,
          link: i.link,
          slug: i.slug,
          title: i.title,
          hasDivider: index === 0,
          dividerTitle: 'GFW PRO USER CONTENT',
        })),
      ];
    }
  });

  return menu;
};

export default createMenuStructure;
