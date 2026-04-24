import React from 'react';
import PropTypes from 'prop-types';
import { Row, Column } from '@worldresources/gfw-components';
import ReactHtmlParser from 'react-html-parser';

import Breadcrumbs from 'components/breadcrumbs';
import Content from 'components/content';
import RelatedContent from 'components/related-content';

import { SearchWrapper } from 'layouts/home/styles';
import Search from 'components/search';
import Accordion from 'components/accordion';
import { groupBy } from 'lodash';
import createMenuStructure from 'utils/menu';
import { useRouter } from 'next/router';
import RowContainer from 'layouts/styles';
import {
  Wrapper,
  BreadcrumbsWrapper,
  ContentWrapper,
  Title,
  Divider,
} from './styles';

const Page = ({ tools, currentPage }) => {
  const { asPath } = useRouter();
  const selectedSlug = asPath.substring(0, asPath.length - 1);
  const toolsGrouped = tools && groupBy(tools, 'parent');
  const parentTools = toolsGrouped?.['0'].filter(
    (item) => item.slug !== 'mapbuilder'
  );
  const proLinks = tools.filter((t) => t.status === 'private');

  const menu = createMenuStructure({
    parentTools,
    toolsGrouped,
    proLinks,
  });

  const slugTokens = selectedSlug.split('/');
  let mainSection;
  let selectedIndex;

  // slugTokens can have 2 tokens when clicking on "overview" or 3 tokens when clicking on any other subsection
  if (slugTokens.length >= 2) {
    [, mainSection] = slugTokens;
    selectedIndex = menu.findIndex((item) => item.slug === mainSection);
  }

  const parentPage = currentPage?.parent
    ? parentTools?.find((p) => p.id === currentPage?.parent)
    : currentPage;

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
      <RowContainer>
        <Column width={[3 / 4]}>
          <BreadcrumbsWrapper>
            <Breadcrumbs
              links={
                currentPage?.parent
                  ? [
                      {
                        label: parentPage?.title,
                        href: parentPage?.link,
                      },
                      {
                        label: currentPage?.title,
                      },
                    ]
                  : [
                      {
                        label: currentPage?.title,
                      },
                    ]
              }
            />
          </BreadcrumbsWrapper>
        </Column>
      </RowContainer>

      <RowContainer>
        <Column width={[1, 1 / 4]}>
          <Row>
            <SearchWrapper>
              <Search expanded />
            </SearchWrapper>
          </Row>
          <Row>
            <Accordion
              sections={menu}
              selectedIndex={selectedIndex}
              selectedSlug={selectedSlug}
            />
          </Row>
        </Column>
        <Column width={[1, 3 / 4]}>
          {title && (
            <Title>{ReactHtmlParser(parent ? title : 'Overview')}</Title>
          )}
          {content && (
            <div id="content">
              <ContentWrapper>
                <Content align="left">{content}</Content>
              </ContentWrapper>
            </div>
          )}
          {relatedContent?.length > 0 && (
            <RelatedContent sections={relatedContent} />
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
    </Wrapper>
  );
};

Page.propTypes = {
  tools: PropTypes.array,
  currentPage: PropTypes.object,
};

export default Page;
