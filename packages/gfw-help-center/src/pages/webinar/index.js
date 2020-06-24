import React from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';
import { isAfter, toDate } from 'date-fns';

import { Row, Column, Loader } from 'gfw-components';

import PostContent from '../../components/content';
import Breadcrumbs from '../../components/breadcrumbs';
import RelatedContent from '../../components/related-content';

import { PostContainer, BreadCrumbsWrapper, PostTitle, Divider, PostContentWrapper } from './styles';

const Post = ({ state, libraries }) => {
  const Html2React = libraries.html2react.Component;
  const data = state.source.get(state.router.link);
  const pageData = state.source[data.type][data.id];

  const {
    title,
    content,
    acf: { related_content: relatedContent, date_time },
  } = pageData || {};

  const webinarDate = new Date(date_time);
  const now = new Date();
  const isUpcoming = isAfter(webinarDate, now);

  const postTitle = isUpcoming ? `Upcoming webinar: ${title.rendered}` : title.rendered;

  return (
    <PostContainer>
      {data.isReady ? (
        <>
          <Row
            css={css`
              position: relative;
              min-height: 40px;
            `}
          >
            <BreadCrumbsWrapper width={[5 / 6, 3 / 4]}>
              <Breadcrumbs />
            </BreadCrumbsWrapper>
          </Row>
          <Row>
            <Column width={[1, 1 / 4]} />
            <Column width={[1, 7 / 12]}>
              <PostTitle className="notranslate">
                {postTitle}
              </PostTitle>
              <PostContentWrapper>
                <PostContent align="left">
                  <Html2React html={content.rendered} />
                </PostContent>
              </PostContentWrapper>
              {relatedContent && (
                <>
                  <Divider />
                  <RelatedContent sections={relatedContent} />
                </>
              )}
            </Column>
          </Row>
        </>
      ) : (
        <Loader />
      )}
    </PostContainer>
  );
};

Post.propTypes = {
  state: PropTypes.object,
  libraries: PropTypes.object,
};

export default connect(Post);
