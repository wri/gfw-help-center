import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';
import { format } from 'date-fns';
import ReactToPrint from 'react-to-print';

import { Row, Column, Loader, Desktop, Mobile } from 'gfw-components';

import PostContent from '../../components/content';
import Breadcrumbs from '../../components/breadcrumbs';
import CategoryList from '../../components/category-list';
import RelatedContent from '../../components/related-content';

import PrintIconSrc from '../../assets/icons/print.svg';

import PrintArticle from './print';

import { PostContainer, BreadCrumbsWrapper, Search, PostTitle, TagsWrapper, Divider, StyledButton, PrintIcon, MetaItem, PostContentWrapper } from './styles';

const isServer = typeof window === 'undefined';

const Post = ({ state, libraries }) => {
  const Html2React = libraries.html2react.Component;
  const data = state.source.get(state.router.link);
  const pageData = state.source[data.type][data.id];

  const {
    title,
    content,
    modified,
    tags: tagIds,
    acf: { related_content },
  } = pageData || {};

  const allTags = Object.values(state.source.tag);
  const tags = allTags?.filter((tag) => tagIds.includes(tag.id));

  const relatedContent = related_content?.filter(
    (c) => c.acf_fc_layout !== 'posts'
  );
  const blogPosts = related_content?.filter((c) => c.acf_fc_layout === 'posts');

  const contentEl = useRef(null);

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
            <BreadCrumbsWrapper width={[5 / 6, 2 / 3]}>
              <Breadcrumbs />
            </BreadCrumbsWrapper>
            <Column width={[1 / 6, 1 / 3]}>
              <Desktop>
                <Search open={state.theme.searchIsActive} showTitle />
              </Desktop>
              <Mobile>
                <Search open={state.theme.searchIsActive} />
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
                    <PrintIcon src={PrintIconSrc} alt="print this article" />
                  </StyledButton>
                )}
                content={() => contentEl.current}
              />
              <div css={css`display: none;`}><PrintArticle ref={contentEl} /></div>
              <MetaItem>
                Print this article
              </MetaItem>
            </Column>
            <Column width={[1, 7 / 12]}>
              <PostTitle className="notranslate">
                <Html2React html={title.rendered} />
              </PostTitle>
              <PostContentWrapper>
                <PostContent align="left">
                  <Html2React html={content.rendered} />
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
