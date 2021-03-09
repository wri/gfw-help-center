import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { convertNodeToElement } from 'react-html-parser';
import PropTypes from 'prop-types';

const CodeBlock = ({ children }) => {
  return (
    <code>
      {children.map((c) => {
        return ReactDOMServer.renderToStaticMarkup(convertNodeToElement(c));
      })}
    </code>
  );
};

CodeBlock.propTypes = {
  children: PropTypes.node,
};

export default CodeBlock;
