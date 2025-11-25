import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import Link from 'next/link';

import { Row, Column, Desktop } from '@worldresources/gfw-components';

import ToolCard from 'components/card-tool';
import SimpleCard from 'components/card-simple';
import Search from 'components/search';

import ArrowIcon from 'assets/icons/arrow.svg';
import { groupBy } from 'lodash';
import Accordion from 'components/accordion';
import createMenuStructure from 'utils/menu';
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

const HomePage = ({ homepage, tools }) => {
  const toolsGrouped = tools && groupBy(tools, 'parent');
  const parentTools = toolsGrouped?.['0'].filter(
    (item) => item.slug !== 'mapbuilder'
  );
  const primaryTools = parentTools?.slice(0, 4);
  const secondaryTools = parentTools?.slice(4, 9);
  const proLinks = tools.filter((t) => t.status === 'private');

  const menu = createMenuStructure({
    parentTools,
    toolsGrouped,
    proLinks,
  });

  return (
    <Wrapper>
      <Row>
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
          <Intro
            title={homepage?.title}
            description={ReactHtmlParser(homepage?.excerpt)}
          />
          <ToolsTitle>Getting started on the GFW tools</ToolsTitle>
          <Row>
            {primaryTools?.map((tool, i) => (
              <ToolCardsWrapper width={[1, 1 / 2]} key={tool.id}>
                {i === 0 && (
                  <Prompt>
                    <Tag>Most people start here!</Tag>
                    <Desktop>
                      <Arrow>
                        <ArrowIcon alt="highlighting first card" />
                      </Arrow>
                    </Desktop>
                  </Prompt>
                )}
                <Link href={tool.link}>
                  <ToolCard
                    active={i === 0}
                    {...tool}
                    text={ReactHtmlParser(tool?.excerpt)}
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
                    width: [1, 1 / 4],
                  })}
                  key={tool.id}
                >
                  <SimpleCard {...tool} large={isFirst} />
                </ToolCardsWrapper>
              );
            })}
          </Row>
        </Column>
      </Row>
    </Wrapper>
  );
};

HomePage.propTypes = {
  tools: PropTypes.array,
  homepage: PropTypes.object,
};

export default HomePage;
