import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';

import PostContent from '../../components/content';

import { PostTitle } from './styles';

class ComponentToPrint extends PureComponent {
  render() {
    const { state, libraries } = this.props;
    const Html2React = libraries.html2react.Component;
    const data = state.source.get(state.router.link);
    const pageData = state.source[data.type][data.id];

    const {
      title,
      content,
    } = pageData || {};

    return (
      <div css={css`padding: 60px 100px;`}>
        <p css={css`margin-bottom: 5px;`}>Global Forest Watch Help Center</p>
        <p css={css`margin-bottom: 50px;`}>https://www.globalforestwatch.org/helpcenter</p>
        <PostTitle className="notranslate">
          <Html2React html={title.rendered} />
        </PostTitle>
        <PostContent align="left">
          <Html2React html={content.rendered} />
        </PostContent>
      </div>
    );
  }
};

ComponentToPrint.propTypes = {
  state: PropTypes.object,
  libraries: PropTypes.object
};

export default connect(ComponentToPrint);
