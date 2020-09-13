import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { isAfter } from 'date-fns';
import ReactHtmlParser from 'react-html-parser';

import { Row, Column, Desktop, Mobile } from 'gfw-components';

import PostContent from 'components/content';
import Breadcrumbs from 'components/breadcrumbs';
import RelatedContent from 'components/related-content';
import CategoryList from 'components/category-list';
import RegisterForm from 'components/forms/register-webinar';

import {
  PostContainer,
  BreadCrumbsWrapper,
  Search,
  PostTitle,
  TagsWrapper,
  Divider,
  PostContentWrapper,
  FormWrapper,
} from './styles';

const Post = ({ webinar }) => {
  const {
    title,
    content,
    tags,
    acf: { related_content: relatedContent, date_time },
  } = webinar || {};

  const webinarDate = new Date(date_time);
  const now = new Date();
  const isUpcoming = isAfter(webinarDate, now);

  const postTitle = isUpcoming
    ? `Upcoming webinar: ${title}`
    : `Webinar: ${title}`;

  return (
    <PostContainer>
      <Row
        css={css`
          position: relative;
          min-height: 40px;
        `}
      >
        <BreadCrumbsWrapper width={[5 / 6, 2 / 3]}>
          <Breadcrumbs
            links={[
              {
                label: 'Webinars',
              },
              {
                label: webinar?.title,
              },
            ]}
          />
        </BreadCrumbsWrapper>
        <Column width={[1 / 6, 1 / 3]}>
          <Desktop>
            <Search expandable showTitle />
          </Desktop>
          <Mobile>
            <Search expandable />
          </Mobile>
        </Column>
      </Row>
      <Row>
        <Column width={[1, 1 / 4]} />
        <Column width={[1, 7 / 12]}>
          <PostTitle className="notranslate">{postTitle}</PostTitle>
          {isUpcoming && (
            <FormWrapper>
              <RegisterForm />
            </FormWrapper>
          )}
          <PostContentWrapper>
            <PostContent align="left">
              {ReactHtmlParser(content.rendered)}
            </PostContent>
            {tags && (
              <TagsWrapper>
                <CategoryList categories={tags} light />
              </TagsWrapper>
            )}
          </PostContentWrapper>
          {relatedContent && (
            <>
              <Divider />
              <RelatedContent sections={relatedContent} />
            </>
          )}
        </Column>
      </Row>
    </PostContainer>
  );
};

Post.propTypes = {
  webinar: PropTypes.object,
};

export default Post;
