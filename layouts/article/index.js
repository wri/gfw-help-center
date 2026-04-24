import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { format } from 'date-fns';
import ReactToPrint from 'react-to-print';
import ReactHtmlParser from 'react-html-parser';
import { translateText } from 'utils/lang';

import { Row, Column, Mobile } from '@worldresources/gfw-components';

import PostContent from 'components/content';
import Breadcrumbs from 'components/breadcrumbs';
import CategoryList from 'components/category-list';
import RelatedContent from 'components/related-content';

import PrintIconSrc from 'assets/icons/print.svg';

import createMenuStructure from 'utils/menu';
import { groupBy } from 'lodash';
import { SearchWrapper } from 'layouts/home/styles';
import Accordion from 'components/accordion';
import RowContainer from 'layouts/styles';
import PrintArticle from './print';

import {
  PostContainer,
  Search,
  PostTitle,
  TagsWrapper,
  Divider,
  StyledButton,
  MetaItem,
  PostContentWrapper,
} from './styles';

const Article = ({ article, isGuide, toolsMapped }) => {
  const { title, content, modified, tags, acf, tools } = article || {};
  const { related_content } = acf || {};
  const relatedContent =
    related_content?.length &&
    related_content?.filter((c) => c.acf_fc_layout !== 'posts');
  const blogPosts =
    related_content?.length &&
    related_content?.filter((c) => c.acf_fc_layout === 'posts');

  const toolsGrouped = toolsMapped && groupBy(toolsMapped, 'parent');
  const parentTools = toolsGrouped?.['0'].filter(
    (item) => item.slug !== 'mapbuilder'
  );
  const proLinks = toolsMapped.filter((t) => t.status === 'private');

  const menu = createMenuStructure({
    parentTools,
    toolsGrouped,
    proLinks,
  });

  const contentEl = useRef(null);

  const pageLabel = isGuide
    ? 'Step by step instructions'
    : 'Additional materials';
  const pageSlug = isGuide ? 'guides' : 'additional-materials';

  const breadCrumbs = article?.tools?.length
    ? [
        {
          label: article?.tools?.[0]?.name,
          href: article?.tools?.[0]?.link,
        },
        {
          label: pageLabel,
          href: `/${article?.tools?.[0]?.slug}/${pageSlug}/`,
        },
        {
          label: article?.title,
        },
      ]
    : [
        {
          label: pageLabel,
        },
        {
          label: article?.title,
        },
      ];

  const lastUpadtedTemplate = translateText('Last updated {date}', {
    date: format(new Date(modified), 'MMMM do yyyy'),
  });

  return (
    <PostContainer>
      <RowContainer>
        <Column width={[1, 1 / 4]}>
          <Row
            css={css`
              padding-top: 2rem;
            `}
          >
            <SearchWrapper>
              <Search expanded />
            </SearchWrapper>
          </Row>
          <Row>
            <Accordion sections={menu} />
          </Row>
          <Mobile>
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
          </Mobile>
        </Column>
        <Column width={[1, 7 / 12]}>
          <Breadcrumbs links={breadCrumbs} />
          {!!tools?.length && (
            <CategoryList
              categories={tools}
              css={css`
                padding-bottom: 1.25rem;
                padding-top: 1.25rem;
              `}
            />
          )}
          <PostTitle>{ReactHtmlParser(title)}</PostTitle>
          <Row css={{ display: 'block' }}>
            <MetaItem>{lastUpadtedTemplate}</MetaItem>
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
          </Row>
          <PostContentWrapper>
            <PostContent align="left">{content}</PostContent>
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
      </RowContainer>
      {!!blogPosts?.length && (
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
  isGuide: PropTypes.bool,
  toolsMapped: PropTypes.array,
};

export default Article;
