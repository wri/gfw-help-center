import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { Row, Column, Desktop, Mobile } from 'gfw-components';
import ReactHtmlParser from 'react-html-parser';

import Breadcrumbs from 'components/breadcrumbs';
import Dropdown from 'components/dropdown';
import Content from 'components/content';
import Menu from 'components/menu';
import RelatedContent from 'components/related-content';

import {
  Wrapper,
  BreadcrumbsWrapper,
  ContentWrapper,
  SearchMobile,
  SearchDesktop,
  Title,
  HeaderWrapper,
  Divider,
} from './styles';

const Page = ({ parentTools, currentPage, siblingTools }) => {
  // build the options for the dropdown
  const parentPageOptions = parentTools?.map((tool) => ({
    name: tool.title.rendered,
    id: tool.id,
    link: tool.link,
  }));

  const primaryTools = parentPageOptions?.slice(0, 4);
  const secondaryTools = parentPageOptions?.slice(4, 8);
  const toolsOptions = [
    ...(primaryTools || []),
    {
      name: 'divider',
      id: 'div-1',
    },
    ...(secondaryTools || []),
  ];

  // active parent page ID
  const currentParentPage = currentPage?.parent || currentPage?.id;
  const parentPage = currentPage?.parent
    ? parentTools.find((p) => p.id === currentPage?.parent)
    : currentPage;

  // build the options for the side bar menu
  const sidebarPages = siblingTools
    ? [parentPage]?.concat(siblingTools)
    : [parentPage];

  const links = sidebarPages?.map((sub) => ({
    label: sub?.parent ? sub?.title?.rendered : 'Overview',
    link: sub?.acf?.alt_link || sub?.link,
    active:
      currentPage?.link === sub?.link || currentPage?.link === `${sub?.link}/`,
  }));

  // get page content
  const { title, content, acf, parent } = currentPage || {};

  // build related content from acf
  const { related_content } = acf || {};
  const relatedContent =
    related_content?.length &&
    related_content?.filter((c) => c.acf_fc_layout !== 'posts');
  const blogPosts =
    related_content?.length &&
    related_content?.filter((c) => c.acf_fc_layout === 'posts');

  return (
    <Wrapper>
      <Row>
        <Column width={[3 / 4]}>
          <BreadcrumbsWrapper>
            <Breadcrumbs
              links={
                currentPage.parent
                  ? [
                      {
                        label: parentPage?.title?.rendered,
                        href: parentPage.link,
                      },
                      {
                        label: currentPage?.title?.rendered,
                      },
                    ]
                  : [
                      {
                        label: currentPage?.title?.rendered,
                      },
                    ]
              }
            />
          </BreadcrumbsWrapper>
        </Column>
        <Column width={[1 / 4]}>
          <SearchMobile expandable />
        </Column>
      </Row>
      <Row
        css={css`
          position: relative;
        `}
      >
        <HeaderWrapper width={[1, 2 / 3]}>
          <Dropdown items={toolsOptions} selected={currentParentPage} />
        </HeaderWrapper>
        <Column width={[1, 1 / 3]}>
          <SearchDesktop expandable />
        </Column>
      </Row>
      <Row>
        <Column width={[1, 1 / 4]}>
          <Desktop>
            <Menu links={links} />
          </Desktop>
        </Column>
        <Column width={[1, 7 / 12]}>
          {title && (
            <Title>
              {ReactHtmlParser(parent ? title?.rendered : 'Overview')}
            </Title>
          )}
          {content && (
            <ContentWrapper>
              <Content align="left">
                {ReactHtmlParser(content?.rendered)}
              </Content>
            </ContentWrapper>
          )}
          {relatedContent?.length > 0 && (
            <RelatedContent sections={relatedContent} />
          )}
        </Column>
      </Row>
      {blogPosts && !!blogPosts.length && (
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
      <Mobile>
        <Menu links={links} />
      </Mobile>
    </Wrapper>
  );
};

Page.propTypes = {
  parentTools: PropTypes.array,
  currentPage: PropTypes.object,
  siblingTools: PropTypes.array,
};

export default Page;
