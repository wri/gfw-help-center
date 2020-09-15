import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { isAfter, format } from 'date-fns';
import ReactHtmlParser from 'react-html-parser';

import { Row, Column, Desktop, Mobile } from 'gfw-components';

import PostContent from 'components/content';
import Breadcrumbs from 'components/breadcrumbs';
import RelatedContent from 'components/related-content';
import CategoryList from 'components/category-list';
// import RegisterForm from 'components/forms/register-webinar';

import {
  PostContainer,
  BreadCrumbsWrapper,
  Search,
  PostTitle,
  TagsWrapper,
  Divider,
  MetaItem,
  PostContentWrapper,
  // FormWrapper,
} from './styles';

const Post = ({ webinar }) => {
  const {
    title,
    content,
    tags,
    modified,
    tools,
    acf: { related_content: relatedContent, date_time },
  } = webinar || {};

  const webinarDate = new Date(date_time);
  const now = new Date();
  const isUpcoming = isAfter(webinarDate, now);

  const postTitle = isUpcoming
    ? `Upcoming webinar: ${title}`
    : `Webinar: ${title}`;

  const breadCrumbs = webinar?.tools?.length
    ? [
        {
          label: webinar?.tools?.[0]?.name,
          href: webinar?.tools?.[0]?.link,
        },
        {
          label: 'Webinars',
          href: `/${webinar?.tools?.[0]?.slug}/webinars/`,
        },
        {
          label: webinar?.title,
        },
      ]
    : [
        {
          label: 'Webinars',
        },
        {
          label: webinar?.title,
        },
      ];

  return (
    <PostContainer>
      <Row
        css={css`
          position: relative;
          min-height: 40px;
        `}
      >
        <BreadCrumbsWrapper width={[5 / 6, 2 / 3]}>
          <Breadcrumbs links={breadCrumbs} />
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
        <Column width={[1, 1 / 4]}>
          <MetaItem>
            {`Last updated ${format(new Date(modified), 'MMMM do yyyy')}`}
          </MetaItem>
        </Column>
        <Column width={[1, 7 / 12]}>
          {!!tools?.length && (
            <CategoryList
              categories={tools}
              css={css`
                margin-bottom: 20px;
              `}
            />
          )}
          <PostTitle className="notranslate">{postTitle}</PostTitle>
          {/* {isUpcoming && (
            <FormWrapper>
              <RegisterForm />
            </FormWrapper>
          )} */}
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
