import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { translateText } from 'utils/lang';

import Divider from './divider';
import Wrapper from './styles';

const Breadcrumbs = ({ links }) => {
  return (
    <Wrapper>
      <Link href="/">Help center home</Link>
      {links?.map(({ label, ...link }) => (
        <Fragment key={label}>
          <Divider />
          {link.href ? (
            <Link {...link}>{translateText(label)}</Link>
          ) : (
            translateText(label)
          )}
        </Fragment>
      ))}
    </Wrapper>
  );
};

Breadcrumbs.propTypes = {
  links: PropTypes.array,
};

export default Breadcrumbs;
