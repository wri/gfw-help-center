import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, css, decode } from 'frontity';
import { Row, Column, Loader, Mobile, Desktop } from 'gfw-components';
import { CancelToken } from 'axios';

import theme from '../../app/theme';

import { fetchPostTypeData } from '../../helpers/request';

import Link from '../../components/link';
import Card from '../../components/card';
import SimpleCard from '../../components/card-simple';
import Menu from '../../components/menu';
import Breadcrumbs from '../../components/breadcrumbs';
import Dropdown from '../../components/dropdown';

import {
  Wrapper,
  SearchMobile,
  SearchDesktop,
  ResultsStatement,
} from './styles';

const SearchPage = ({ state, libraries }) => {
  const Html2React = libraries?.html2react?.Component;

  const [articles, setArticles] = useState([]);
  const [webinars, setWebinars] = useState([]);
  const [type, setType] = useState('articles');
  const [loading, setLoading] = useState(true);

  const data = state.source.get(state.router.link);
  const { isTag, searchQuery } = data;
  const isSearchEmpty = data.link === '/?s=';
  const isSearch = isSearchEmpty || data.isSearch;
  const total = articles.length + webinars.length;
  const articleText = total === 1 ? 'article' : 'articles';

  const searchStatement =
    isSearch &&
    `${total} ${articleText} with the keyword ${decodeURI(searchQuery)}`;
  const tagStatement =
    isTag &&
    `${total} ${articleText} tagged with ${decode(
      state.source[data.taxonomy][data.id].name
    )}`;

  const resultsStatement = searchStatement || tagStatement;

  const { tags } = state.source.data['top-tags/'];

  const allTags = isTag && tags;
  const taxOptions = allTags || [];
  const taxFromList =
    !!taxOptions?.length && taxOptions.find((tax) => tax.id === data?.id);
  const taxSelected =
    taxFromList ||
    state.source?.[data.taxonomy]?.[data.id] ||
    state.source.author?.[data.id];
  const taxId = taxSelected?.id;

  const allTaxOptions = taxFromList
    ? taxOptions
    : [{ ...taxSelected, count: total }, ...taxOptions];

  const links = [
    {
      label: 'Articles',
      onClick: () => setType('articles'),
      active: type === 'articles',
      count: articles.length,
    },
    {
      label: 'Webinars',
      onClick: () => setType('webinars'),
      active: type === 'webinars',
      count: webinars.length,
    },
  ];

  useEffect(() => {
    const getSearchResults = async () => {
      const source = CancelToken.source();

      try {
        const articlesResponse = await fetchPostTypeData({
          baseUrl: state.source.api,
          type: 'articles',
          params: {
            ...(searchQuery && {
              search: searchQuery,
            }),
            ...(isTag && {
              tags: data.id,
            }),
          },
          cancelToken: source.token,
        });

        const webinarResponse = await fetchPostTypeData({
          baseUrl: state.source.api,
          type: 'webinars',
          params: {
            ...(searchQuery && {
              search: searchQuery,
            }),
            ...(isTag && {
              tags: data.id,
            }),
          },
          cancelToken: source.token,
        });

        setArticles(articlesResponse);
        setWebinars(webinarResponse);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    getSearchResults();
  }, [searchQuery]);

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
            <SearchMobile open={state.theme.searchIsActive} />
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
            <Dropdown items={allTaxOptions} selected={taxId} />
          </Column>
          <Column width={[1, 1 / 3]}>
            <SearchDesktop showTitle open={state.theme.searchIsActive} />
          </Column>
        </Row>
      )}
      <Row>
        {loading && (
          <Column
            css={css`
              position: relative;
              min-height: 300px;
            `}
          >
            <Loader />
          </Column>
        )}
        {!loading && (
          <>
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
                  articles?.map(({ id, excerpt, link, ...rest }) => (
                    <Column
                      key={id}
                      css={css`
                        margin-bottom: 40px !important;
                      `}
                    >
                      <Link link={link}>
                        <SimpleCard
                          {...rest}
                          text={<Html2React html={excerpt?.rendered} />}
                          arrow
                        />
                      </Link>
                    </Column>
                  ))}
                {type === 'webinars' &&
                  webinars?.map(
                    ({ id, excerpt, featured_media: media, ...rest }) => (
                      <Column
                        width={[1, 1 / 2]}
                        css={css`
                          margin-bottom: 40px !important;
                        `}
                        key={id}
                      >
                        <Card
                          {...rest}
                          excerpt={<Html2React html={excerpt?.rendered} />}
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
          </>
        )}
      </Row>
      <Mobile>
        <Menu links={links} />
      </Mobile>
    </Wrapper>
  );
};

SearchPage.propTypes = {
  state: PropTypes.object,
  libraries: PropTypes.object,
};

export default connect(SearchPage);
