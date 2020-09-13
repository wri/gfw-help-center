import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { format } from 'date-fns';
import ReactToPrint from 'react-to-print';
import ReactHtmlParser from 'react-html-parser';

import { Row, Column, Desktop, Mobile } from 'gfw-components';

import PostContent from 'components/content';
import Breadcrumbs from 'components/breadcrumbs';
import CategoryList from 'components/category-list';
import RelatedContent from 'components/related-content';

import PrintIconSrc from 'assets/icons/print.svg';

import PrintArticle from './print';

import {
  PostContainer,
  BreadCrumbsWrapper,
  Search,
  PostTitle,
  TagsWrapper,
  Divider,
  StyledButton,
  MetaItem,
  PostContentWrapper,
} from './styles';

const Article = ({ article }) => {
  const {
    title,
    content,
    modified,
    tags,
    acf: { related_content },
  } = article || {};

  const relatedContent =
    related_content?.length &&
    related_content?.filter((c) => c.acf_fc_layout !== 'posts');
  const blogPosts =
    related_content?.length &&
    related_content?.filter((c) => c.acf_fc_layout === 'posts');

  const contentEl = useRef(null);

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
                label: 'Guides',
              },
              {
                label: article?.title,
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
        <Column width={[1, 1 / 4]}>
          <MetaItem>
            {`Last updated ${format(new Date(modified), 'MMMM do yyyy')}`}
          </MetaItem>
          <ReactToPrint
            documentTitle="Global Forest Watch Help Center"
            trigger={() => (
              <StyledButton light round>
                <PrintIconSrc />
              </StyledButton>
            )}
            content={() => contentEl.current}
          />
          <div
            css={css`
              display: none;
            `}
          >
            <PrintArticle ref={contentEl} article={article} />
          </div>
          <MetaItem>Print this article</MetaItem>
        </Column>
        <Column width={[1, 7 / 12]}>
          <PostTitle className="notranslate">
            {ReactHtmlParser(title)}
          </PostTitle>
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
      {blogPosts && (
        <>
          <Divider />
          <Row>
            <Column>
              <RelatedContent sections={blogPosts} maxCols={3} />
            </Column>
          </Row>
          <Divider />
        </>
      )}
    </PostContainer>
  );
};

Article.propTypes = {
  article: PropTypes.object,
};

export default Article;
