import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { Row, Column, Mobile, Desktop, theme } from 'gfw-components';
import ReactHtmlParser from 'react-html-parser';
import { useRouter } from 'next/router';

import Link from 'components/link';
import Card from 'components/card';
import SimpleCard from 'components/card-simple';
import Menu from 'components/menu';
import Breadcrumbs from 'components/breadcrumbs';
import Dropdown from 'components/dropdown';

import {
  Wrapper,
  SearchMobile,
  SearchDesktop,
  ResultsStatement,
} from './styles';

const SearchPage = ({ tag, tags, articles, webinars, isSearch }) => {
  const [type, setType] = useState('articles');
  const { query } = useRouter();
  const { query: searchQuery } = query || {};

  const total = articles?.length + webinars?.length;
  const articleText = total === 1 ? 'article' : 'articles';

  const resultsStatement = isSearch
    ? `${total} ${articleText} with the keyword ${decodeURI(searchQuery)}`
    : `${total} ${articleText} tagged with ${tag?.name}`;

  const taxFromList = tags?.find((tax) => tax.id === tag?.id);
  const allTaxOptions = taxFromList
    ? tags
    : [{ ...tag, count: total }, ...tags];

  const links = [
    {
      label: 'Articles',
      onClick: () => setType('articles'),
      active: type === 'articles',
      count: articles?.length,
    },
    {
      label: 'Webinars',
      onClick: () => setType('webinars'),
      active: type === 'webinars',
      count: webinars?.length,
    },
  ];

  return (
    <Wrapper>
      <Row
        css={css`
          position: relative;
          min-height: 40px;
        `}
      >
        <Column width={[3 / 4]}>
          <Breadcrumbs
            css={css`
              margin-bottom: 25px;
              ${theme.mediaQueries.small} {
                margin-bottom: 40px;
              }
            `}
          />
        </Column>
        {!isSearch && (
          <Column width={[1 / 4]}>
            <SearchMobile expandable />
          </Column>
        )}
        {isSearch && (
          <>
            <Column>
              <SearchDesktop expanded isSearch />
            </Column>
          </>
        )}
      </Row>
      {!isSearch && (
        <Row
          css={css`
            position: relative;
          `}
        >
          <Column width={[1, 2 / 3]}>
            <Dropdown items={allTaxOptions} selected={tag?.id} />
          </Column>
          <Column width={[1, 1 / 3]}>
            <SearchDesktop showTitle expandable />
          </Column>
        </Row>
      )}
      <Row>
        <Column
          css={css`
            margin-bottom: 50px !important;
          `}
        >
          <ResultsStatement>{resultsStatement}</ResultsStatement>
        </Column>
        <Column width={[1, 1 / 4]}>
          <Desktop>
            <Menu links={links} />
          </Desktop>
        </Column>
        <Column width={[1, 3 / 4]}>
          <Row nested>
            {type === 'articles' &&
              articles?.map(({ id, title, excerpt, link, ...rest }) => (
                <Column
                  key={id}
                  css={css`
                    margin-bottom: 40px !important;
                  `}
                >
                  <Link href={link}>
                    <a>
                      <SimpleCard
                        {...rest}
                        title={ReactHtmlParser(title?.rendered)}
                        text={ReactHtmlParser(excerpt?.rendered)}
                        arrow
                      />
                    </a>
                  </Link>
                </Column>
              ))}
            {type === 'webinars' &&
              webinars?.map(
                ({ id, title, excerpt, featured_media: media, ...rest }) => (
                  <Column
                    width={[1, 1 / 2]}
                    css={css`
                      margin-bottom: 40px !important;
                    `}
                    key={id}
                  >
                    <Card
                      {...rest}
                      title={ReactHtmlParser(title?.rendered)}
                      excerpt={ReactHtmlParser(excerpt?.rendered)}
                      {...(media && {
                        media,
                      })}
                      video
                    />
                  </Column>
                )
              )}
          </Row>
        </Column>
      </Row>
      <Mobile>
        <Menu links={links} />
      </Mobile>
    </Wrapper>
  );
};

SearchPage.propTypes = {
  tag: PropTypes.object,
  tags: PropTypes.array,
  articles: PropTypes.array,
  webinars: PropTypes.array,
  isSearch: PropTypes.bool,
};

export default SearchPage;
