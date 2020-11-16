import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { trackEvent } from 'utils/analytics';

import ExpandableCard from 'components/card-expandable';

const FAQs = ({ faqs }) => {
  return (
    <>
      {faqs?.map(({ question, answer }) => (
        <CardWrapper key={question}>
          <ExpandableCard
            title={question}
            content={answer}
            onAfterOpen={() =>
              trackEvent({
                category: 'Help Center',
                action: 'User clicks FAQ',
                label: `User expands ${question} FAQ`,
              })}
          />
        </CardWrapper>
      ))}
    </>
  );
};

FAQs.propTypes = {
  faqs: PropTypes.array,
};

const CardWrapper = styled.div`
  margin-bottom: 25px;
`;

export default FAQs;
