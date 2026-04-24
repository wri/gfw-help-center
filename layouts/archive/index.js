import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { Row, Column, Mobile } from '@worldresources/gfw-components';
import { useRouter } from 'next/router';
import compact from 'lodash/compact';
import { translateText } from 'utils/lang';

import Card from 'components/card';
import SimpleCard from 'components/card-simple';
import Menu from 'components/menu';
import Breadcrumbs from 'components/breadcrumbs';

import createMenuStructure from 'utils/menu';
import { groupBy } from 'lodash';
import Accordion from 'components/accordion';
import { SearchWrapper } from 'layouts/home/styles';
import Search from 'components/search';
import RowContainer from 'layouts/styles';
import { Wrapper, ResultsStatement, MenuWrapper, ResultTitle } from './styles';

const SearchPage = ({
  tag,
  articles,
  webinars,
  additionalMaterials,
  isSearch,
  tools,
}) => {
  const { query } = useRouter();
  const { query: searchQuery } = query || {};

  const toolsGrouped = tools && groupBy(tools, 'parent');
  const parentTools =
    toolsGrouped?.['0'].filter((item) => item.slug !== 'mapbuilder') || [];
  const proLinks = tools?.filter((t) => t.status === 'private') || [];

  const menu = createMenuStructure({
    parentTools,
    toolsGrouped,
    proLinks,
  });

  const total =
    articles?.length + webinars?.length + additionalMaterials?.length;
  const articleText = total === 1 ? 'article' : 'articles';

  const searchStatement =
    isSearch &&
    searchQuery &&
    `{total} ${articleText} with the keyword ${decodeURI(searchQuery)}`;
  const tagStatement =
    !isSearch && `{total} ${articleText} tagged with ${tag?.name}`;

  const resultsStatement = translateText(
    isSearch ? searchStatement : tagStatement,
    { total }
  );

  const links = [
    {
      label: translateText('Step by step instructions'),
      count: articles?.length || '0',
    },
    {
      label: translateText('Webinars'),
      count: webinars?.length || '0',
    },
    {
      label: translateText('Additional Materials'),
      count: additionalMaterials?.length || '0',
    },
  ];

  const breadCrumbs = compact([
    {
      label: isSearch ? 'Search' : 'Tags',
    },
    searchQuery &&
      isSearch && {
        label: decodeURI(searchQuery),
      },
    !isSearch && {
      label: tag?.name,
    },
  ]);

  const tokens = window.location.pathname.split('/').filter((t) => t !== '');

  const tagName =
    tag?.name || tokens.length !== 0
      ? tokens[tokens.length - 1].replaceAll('-', ' ')
      : '';

  return (
    <Wrapper>
      <RowContainer>
        <Column width={[1, 1 / 4]}>
          <Row>
            <SearchWrapper>
              <Search expanded />
            </SearchWrapper>
          </Row>
          <Row>
            <Accordion sections={menu} />
          </Row>
        </Column>
        <Column width={[1, 3 / 4]}>
          <Row css={{ display: 'block' }}>
            <Row>
              <Breadcrumbs links={breadCrumbs} />
            </Row>
            <Row>
              <ResultTitle>
                Results for&nbsp;&ldquo;
                {tagName}
                &rdquo;
              </ResultTitle>
            </Row>
            <ResultsStatement>{resultsStatement}</ResultsStatement>
            <Menu links={links} />
          </Row>
          {/* Step by step instructions */}
          {articles && articles.length > 0 && (
            <>
              <Row>
                <h2
                  css={css`
                    font-size: 24px;
                    font-weight: 600;
                    margin: 40px 0 20px 0;
                    color: #333;
                  `}
                >
                  {translateText('Step by step instructions')}
                  {' '}
                  (
                  {articles.length}
                  )
                </h2>
              </Row>
              <Row nested>
                {articles.map(({ id, ...rest }) => (
                  <Column
                    key={id}
                    css={css`
                      margin-bottom: 40px !important;
                    `}
                  >
                    <SimpleCard {...rest} arrow />
                  </Column>
                ))}
              </Row>
            </>
          )}

          {/* Webinars */}
          {webinars && webinars.length > 0 && (
            <>
              <Row>
                <h2
                  css={css`
                    font-size: 24px;
                    font-weight: 600;
                    margin: 40px 0 20px 0;
                    color: #333;
                  `}
                >
                  {translateText('Webinars')}
                  {' '}
                  (
                  {webinars.length}
                  )
                </h2>
              </Row>
              <Row nested>
                {webinars.map(({ id, ...rest }) => (
                  <Column
                    width={[1, 1 / 2]}
                    css={css`
                      margin-bottom: 40px !important;
                    `}
                    key={id}
                  >
                    <Card {...rest} video />
                  </Column>
                ))}
              </Row>
            </>
          )}

          {/* Additional Materials */}
          {additionalMaterials && additionalMaterials.length > 0 && (
            <>
              <Row>
                <h2
                  css={css`
                    font-size: 24px;
                    font-weight: 600;
                    margin: 40px 0 20px 0;
                    color: #333;
                  `}
                >
                  {translateText('Additional Materials')}
                  {' '}
                  (
                  {additionalMaterials.length}
                  )
                </h2>
              </Row>
              <Row nested>
                {additionalMaterials.map(({ id, ...rest }) => (
                  <Column
                    key={id}
                    css={css`
                      margin-bottom: 40px !important;
                    `}
                  >
                    <SimpleCard {...rest} arrow />
                  </Column>
                ))}
              </Row>
            </>
          )}
        </Column>
      </RowContainer>
      <Mobile>
        <MenuWrapper>
          <Menu links={links} />
        </MenuWrapper>
      </Mobile>
    </Wrapper>
  );
};

SearchPage.propTypes = {
  tag: PropTypes.object,
  tags: PropTypes.array,
  articles: PropTypes.array,
  webinars: PropTypes.array,
  additionalMaterials: PropTypes.array,
  isSearch: PropTypes.bool,
  tools: PropTypes.array,
};

export default SearchPage;
