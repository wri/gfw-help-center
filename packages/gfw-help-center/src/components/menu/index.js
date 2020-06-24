import React from 'react';
import PropTypes from 'prop-types';

import Link from '../link';

import { MenuItem } from './styles';

const Menu = ({ links }) => (
  <ul>
    {links?.map((l) => (
      <MenuItem active={l.active} key={l.label}>
        {l.link ? (
          <Link link={l.link}>
            {`${l.label}${l.count ? ` (${l.count})` : ''}`}
          </Link>
        ) : (
          <button onClick={l.onClick}>
            {`${l.label}${l.count ? ` (${l.count})` : ''}`}
          </button>
        )}
      </MenuItem>
    ))}
  </ul>
);

Menu.propTypes = {
  links: PropTypes.array,
};

export default Menu;
