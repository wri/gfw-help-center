import { styled } from 'frontity';
import { theme } from 'gfw-components';

export default styled.div`
  position: relative;
  font-size: 18px;
  line-height: 32px;
  color: ${theme.colors.darkestGrey};
  word-break: break-word;
  text-align: left;

  ${theme.mediaQueries.small} {
    font-size: 20px;
    line-height: 36px;
  }

  *::selection {
    background: ${theme.colors.green};
    color: ${theme.colors.white};
  }

  > *,
  p,
  a {
    font-size: inherit;
    line-height: inherit;
    margin-bottom: 40px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  em,
  i,
  q,
  dfn {
    font-style: italic;
  }

  em em,
  em i,
  i em,
  i i,
  cite em,
  cite i {
    font-weight: bolder;
  }

  big {
    font-size: 1.2em;
  }

  small {
    font-size: 0.75em;
  }

  b,
  strong {
    font-weight: 700;
  }

  ins {
    text-decoration: underline;
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sup {
    top: -0.5em;
  }

  sub {
    bottom: -0.25em;
  }

  abbr,
  acronym {
    cursor: help;
  }

  address {
    line-height: 1.5;
    margin: 0 0 2rem 0;
  }

  hr {
    display: none;
    height: 2px;
    display: block;
    width: 65px;
    border: none;
    margin: 0 0 40px 0;
    background-color: ${theme.colors.lightGrey};
  }

  a {
    color: ${theme.colors.green};

    &:hover,
    &:focus {
      color: ${theme.colors.darkGreen};
      text-decoration: underline;
    }
  }

  h2,
  h3,
  h4 {
    line-height: 36px;
    font-weight: 500;
    padding-top: 20px;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 24px;
  }

  h3 {
    font-size: 20px;
  }

  h4 {
    font-size: 18px;
    text-transform: uppercase;
  }

  /* intro/outro text */
  & > .attribute {
    color: #787878;
    font-style: italic;
    padding: 0;
    font-size: inherit;
    line-height: inherit;
  }

  figure,
  iframe,
  .imagecenter,
  table {
    margin: 0;
    padding: 0;
    display: block;
    width: 100%;

    ${theme.mediaQueries.small} {
      width: calc(100% + (100% / 7));
      margin-left: calc(-100% / 7);

      ${({ align }) =>
        align === 'left' &&
        `
        margin-left: unset;
        margin-right: calc(-100% / 7);
      `}
    }

    iframe {
      width: 100%;
    }
  }

  figcaption,
  caption {
    font-size: 12px;
    line-height: 18px;
    color: ${theme.colors.darkGrey};
    padding-top: 10px;
  }

  img {
    max-width: 100%;
    object-fit: cover;
    object-position: center;
    margin-bottom: 0;
    display: block;
  }

  ul,
  ol {
    margin: 0 0 3rem 3rem;
  }

  ul {
    list-style: disc;
  }

  ul ul {
    list-style: circle;
  }

  ul ul ul {
    list-style: square;
  }

  ol {
    list-style: decimal;
  }

  ol ol {
    list-style: lower-alpha;
  }

  ol ol ol {
    list-style: lower-roman;
  }

  li {
    line-height: 1.5;
    margin: 0.5rem 0 0 2rem;
  }

  li > ul,
  li > ol {
    margin: 1rem 0 0 2rem;
  }

  dt,
  dd {
    line-height: 1.5;
  }

  dt {
    font-weight: 700;
  }

  dt + dd {
    margin-top: 0.5rem;
  }

  dd + dt {
    margin-top: 1.5rem;
  }

  ul,
  ol {
    margin-left: 16px;

    ${theme.mediaQueries.small} {
      margin-left: 20px;
    }

    li {
      margin-bottom: 20px;
    }
  }

  table {
    border: 1px solid ${theme.colors.lightGrey};
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
    font-size: 16px;
    line-height: 19px;
    color: ${theme.colors.darkGrey};
    max-width: 100%;
    overflow: hidden;
    width: 100%;
    display: table;
  }

  .alignleft > table {
    margin: 0;
  }

  .alignright > table {
    margin: 0;
  }

  th,
  td {
    border: 1px solid ${theme.colors.lightGrey};
    border-right: 0;
    border-left: 0;
    line-height: 1.4;
    margin: 0;
    overflow: visible;
    padding: 10px;

    ${theme.mediaQueries.small} {
      padding: 20px;
    }
  }

  tr:nth-of-type(2n + 1) {
    background-color: ${theme.colors.lightestGrey};
  }

  tr:first-of-type {
    background-color: ${theme.colors.lightGrey};
    text-transform: uppercase;
    color: #777;
    font-size: 14px;

    th,
    td {
      padding: 10px 15px;

      ${theme.mediaQueries.small} {
        padding: 10px 20px;
      }
    }
  }

  tr {
    th,
    td {
      &:first-child {
        padding-left: 20px;

        ${theme.mediaQueries.small} {
          padding-left: 40px;
        }
      }

      &:last-child {
        padding-right: 20px;

        ${theme.mediaQueries.small} {
          padding-left: 40px;
        }
      }
    }
  }

  thead {
    vertical-align: bottom;
    white-space: nowrap;
  }

  th {
    font-weight: 600;
  }

  figure {
    padding-top: 20px;
    margin-bottom: 40px;
  }

  .wp-block-gallery > div {
    margin: 0;
    width: 100%;

    img {
      height: 240px;

      ${theme.mediaQueries.small} {
        height: 486px;
      }
    }

    figure {
      margin: 0 auto !important;
      width: 100% !important;
    }

    .slick-prev,
    .slick-next {
      top: 100px;
      background-color: #333;
      z-index: 5;

      ${theme.mediaQueries.small} {
        top: 220px;
      }

      &:hover {
        background-color: #97bd3d;
      }
    }

    .slick-prev {
      left: -5px;

      ${theme.mediaQueries.medium} {
        left: -10px;
      }

      ${theme.mediaQueries.large} {
        left: -150px;
      }
    }

    .slick-next {
      right: -5px;

      ${theme.mediaQueries.medium} {
        right: -10px;
      }

      ${theme.mediaQueries.large} {
        right: -150px;
      }
    }
  }
`;
