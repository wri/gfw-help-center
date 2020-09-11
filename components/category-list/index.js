import React from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';

import { Wrapper, CategoryPill, H5 } from './styles';

const CategoryList = ({ categories = [], light, title, ...props }) => (
  <Wrapper {...props}>
    {title && <H5>{title}</H5>}
    {categories.map(({ name, link } = {}) => (
      <Link key={name + link} href={link}>
        <CategoryPill light={light}>{name}</CategoryPill>
      </Link>
    ))}
  </Wrapper>
);

export default CategoryList;

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
  light: PropTypes.bool,
  title: PropTypes.string,
};
