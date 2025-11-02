import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  AccordionItem,
  AccordionSubItem,
  AccordionWrapper,
  DividerTitle,
  GreenDot,
  GreenDotWrapper,
} from './styles';

const Accordion = ({ isExpanded = null, onToggle, sections, selectedSlug }) => {
  const [openIndex, setOpenIndex] = useState(isExpanded);

  // Keep internal state in sync when parent changes the prop
  useEffect(() => {
    setOpenIndex(isExpanded);
  }, [isExpanded]);

  const handleToggle = (index) => {
    const newIndex = openIndex === index ? null : index;
    setOpenIndex(newIndex);
    onToggle?.(newIndex); // notify parent if provided
  };

  // eslint-disable-next-line react/prop-types
  const CaretRight = ({ color }) => (
    <svg
      width="1rem"
      height="1rem"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.39862 4.32752C9.69152 4.03463 10.1664 4.03463 10.4593 4.32752L16.8232 10.6915C17.5067 11.3749 17.5067 12.4829 16.8232 13.1664L10.4593 19.5303C10.1664 19.8232 9.69152 19.8232 9.39863 19.5303C9.10573 19.2374 9.10573 18.7625 9.39863 18.4697L15.7626 12.1057C15.8602 12.0081 15.8602 11.8498 15.7626 11.7521L9.39863 5.38818C9.10573 5.09529 9.10573 4.62041 9.39862 4.32752Z"
        fill={color}
      />
    </svg>
  );

  // eslint-disable-next-line react/prop-types
  const CaretDown = ({ color }) => (
    <svg
      width="1rem"
      height="1rem"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.46938 9.39966C4.76227 9.10677 5.23715 9.10677 5.53004 9.39966L11.894 15.7636C11.9916 15.8613 12.1499 15.8613 12.2476 15.7636L18.6115 9.39966C18.9044 9.10677 19.3793 9.10677 19.6722 9.39966C19.9651 9.69256 19.9651 10.1674 19.6722 10.4603L13.3082 16.8243C12.6248 17.5077 11.5168 17.5077 10.8333 16.8243L4.46938 10.4603C4.17649 10.1674 4.17649 9.69256 4.46938 9.39966Z"
        fill={color}
      />
    </svg>
  );

  // eslint-disable-next-line no-console
  console.log('selectedSlug: ', selectedSlug);

  return (
    <AccordionWrapper>
      {sections.map((section, index) => (
        <div key={index}>
          {section.hasDivider && <hr />}
          {section.subsections.length === 0 && (
            <AccordionItem>
              <span>
                <CaretRight color="transparent" />
              </span>
              <a href={`/help${section.link}`}>{section.title}</a>
              <GreenDotWrapper>
                {openIndex === index && <GreenDot />}
              </GreenDotWrapper>
            </AccordionItem>
          )}
          {section.subsections.length !== 0 && (
            <AccordionItem>
              <button onClick={() => handleToggle(index)}>
                <span>
                  {openIndex === index ? (
                    <CaretDown color="#000000" />
                  ) : (
                    <CaretRight color="#000000" />
                  )}
                </span>
                <span>{section.title}</span>
              </button>
            </AccordionItem>
          )}
          {openIndex === index && (
            <div>
              {section.subsections.map((sub, subIndex) => (
                <div key={subIndex}>
                  {sub.hasDivider && <hr />}
                  {sub.hasDivider && (
                    <DividerTitle>{sub.dividerTitle}</DividerTitle>
                  )}
                  <AccordionSubItem selected={openIndex === subIndex}>
                    <a href={`/help${sub.link}`}>{sub.title}</a>
                    <GreenDotWrapper>
                      {openIndex === subIndex && <GreenDot />}
                    </GreenDotWrapper>
                  </AccordionSubItem>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </AccordionWrapper>
  );
};

export default Accordion;

Accordion.propTypes = {
  isExpanded: PropTypes.number,
  onToggle: PropTypes.func,
  sections: PropTypes.array,
  selectedSlug: PropTypes.string,
};
