/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'frontity';
import { H4 } from 'gfw-components';

import FAQs from './faqs';
import PostType from './post-type';

import { Wrapper } from './styles';

const ContentComponents = {
  faqs: FAQs,
  articles: PostType,
  organizations: PostType,
  webinars: PostType,
  posts: PostType,
};

const RelatedContent = ({ sections, maxCols }) => (
  <Wrapper>
    {sections?.length > 0 &&
      sections?.map((section) => {
        const { acf_fc_layout: sectionType, title: sectionTitle } = section;
        const Component = ContentComponents[sectionType];

        return Component ? (
          <div key={sectionTitle || sectionType}>
            {sectionTitle && (
              <H4
                css={css`
                  margin-bottom: 30px;
                `}
              >
                {sectionTitle}
              </H4>
            )}
            <Component {...section} postType={sectionType} include={section[`${sectionType}_by_id`]} maxCols={maxCols} />
          </div>
        ) : null;
      })}
  </Wrapper>
);

RelatedContent.propTypes = {
  sections: PropTypes.array,
  maxCols: PropTypes.number,
};

export default RelatedContent;
