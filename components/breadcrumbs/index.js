import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import Divider from './divider';
import Wrapper from './styles';

const Breadcrumbs = ({ links }) => {
  return (
    <Wrapper>
      <Link href="/">Help center home</Link>
      {links?.map(({ label, ...link }) => (
        <>
          <Divider />
          {link.href ? <Link {...link}>{label}</Link> : label}
        </>
      ))}
    </Wrapper>
  );
};

Breadcrumbs.propTypes = {
  links: PropTypes.array,
};

export default Breadcrumbs;
