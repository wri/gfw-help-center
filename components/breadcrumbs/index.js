import React from 'react';
import PropTypes from 'prop-types';
import { connect, decode } from 'frontity';
import { isSearchLink } from 'utils/content';
import Link from 'next/link';
import Divider from './divider';

import Wrapper from './styles';

const Breadcrumbs = ({ state }) => {
  const data = state.source.get(state.router.link);
  const pageData = state.source?.[data?.type]?.[data?.id];
  const parent = state.source?.[pageData?.type]?.[pageData?.parent];

  return (
    <Wrapper>
      <Link href="/">Help center home</Link>
      {isSearchLink(state.router.link) && (
        <>
          <Divider />
          <span>Search results</span>
        </>
      )}
      {data.isHelpTags && (
        <>
          <Divider />
          <span>Tags</span>
        </>
      )}
      {parent && (
        <>
          <Divider />
          <Link link={parent.link}>{decode(parent.title.rendered)}</Link>
        </>
      )}
      {pageData?.type === 'articles' && (
        <>
          <Divider />
          <Link href="/guides">Step by step instructions</Link>
        </>
      )}
      {pageData?.type === 'webinars' && (
        <>
          <Divider />
          <Link href="/webinars">Webinars</Link>
        </>
      )}
      {data.isPostType && (
        <>
          <Divider />
          <span>{decode(state.source[data.type][data.id].title.rendered)}</span>
        </>
      )}
    </Wrapper>
  );
};

Breadcrumbs.propTypes = {
  state: PropTypes.object,
};

export default connect(Breadcrumbs);
