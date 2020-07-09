/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';
import { Row, Column, Desktop } from 'gfw-components';

import ToolCard from '../../components/card-tool';
import SimpleCard from '../../components/card-simple';
import Search from '../../components/search';
import Link from '../../components/link';

import ArrowIcon from '../../assets/icons/arrow.svg';

import {
  Wrapper,
  Prompt,
  Tag,
  Arrow,
  ToolsTitle,
  ToolCardsWrapper,
  SearchWrapper,
  Intro,
} from './styles';

const HomePage = ({ state, libraries }) => {
  const Html2React = libraries?.html2react?.Component;

  const { tools, home } = state.source.data['all-tools/'];

  const allTools = tools?.['0'];

  const primaryTools = allTools?.slice(0, 4);
  const secondaryTools = allTools?.slice(4, 8);

  return (
    <Wrapper>
      <Row>
        <Column width={[1, 5 / 6, 2 / 3]}>
          <Intro
            title={home?.title?.rendered || state.theme.title}
            description={
              <Html2React html={home?.excerpt?.rendered} /> ||
              state.theme.description
            }
          />
        </Column>
        <SearchWrapper>
          <Search expanded />
        </SearchWrapper>
      </Row>
      <Row
        css={css`
          margin-bottom: 30px;
        `}
      >
        <Column>
          <ToolsTitle>Getting started on the GFW tools</ToolsTitle>
        </Column>
        {primaryTools?.map((tool, i) => (
          <ToolCardsWrapper width={[1, 1 / 2]} key={tool.id}>
            {i === 0 && (
              <Prompt>
                <Tag>Most people start here!</Tag>
                <Desktop>
                  <Arrow src={ArrowIcon} alt="arrow" />
                </Desktop>
              </Prompt>
            )}
            <Link link={tool.link}>
              <ToolCard
                active={i === 0}
                {...tool}
                title={tool?.title?.rendered}
                text={<Html2React html={tool?.excerpt?.rendered} />}
              />
            </Link>
          </ToolCardsWrapper>
        ))}
      </Row>
      <Row>
        <Column>
          <ToolsTitle>Using global forest watch</ToolsTitle>
        </Column>
        {secondaryTools?.map((tool, index) => {
          const isFirst = index === 0;

          return (
            <ToolCardsWrapper
              {...(!isFirst && {
                width: [1, 1 / 3],
              })}
              key={tool.id}
            >
              <Link link={tool.link}>
                <SimpleCard
                  {...tool}
                  large={isFirst}
                  title={tool?.title?.rendered}
                  text={<Html2React html={tool?.excerpt?.rendered} />}
                />
              </Link>
            </ToolCardsWrapper>
          );
        })}
      </Row>
    </Wrapper>
  );
};

HomePage.propTypes = {
  state: PropTypes.object,
  libraries: PropTypes.object,
};

export default connect(HomePage);
