import React from 'react';
import PropTypes from 'prop-types';
import { Mobile } from '@worldresources/gfw-components';

import Link from 'next/link';

import { formatMenuData } from 'utils/content';

import { MenuWrapper, MenuItem, Title, ProTitle } from './styles';

const Menu = ({ links }) => {
  const [standardLinks, proLinks] = formatMenuData(links);
  return (
    <MenuWrapper>
      <Mobile>
        <Title>Categories</Title>
      </Mobile>
      {standardLinks?.map((l) => (
        <MenuItem active={l.active} key={l.label}>
          {l.link ? (
            <Link href={l.link}>
              {`${l.label}${l.count ? ` (${l.count})` : ''}`}
            </Link>
          ) : (
            <button onClick={l.onClick}>
              {`${l.label}${l.count ? ` (${l.count})` : ''}`}
            </button>
          )}
        </MenuItem>
      ))}
      {proLinks && proLinks.length > 0 && (
        <ProTitle>GFW pro user content</ProTitle>
      )}
      {proLinks?.map((l) => (
        <MenuItem active={l.active} key={l.label}>
          {l.link ? (
            <Link href={l.link}>
              {`${l.label}${l.count ? ` (${l.count})` : ''}`}
            </Link>
          ) : (
            <button onClick={l.onClick}>
              {`${l.label}${l.count ? ` (${l.count})` : ''}`}
            </button>
          )}
        </MenuItem>
      ))}
    </MenuWrapper>
  );
};

Menu.propTypes = {
  links: PropTypes.array,
};

export default Menu;
