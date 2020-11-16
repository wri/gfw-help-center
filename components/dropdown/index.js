import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { trackEvent } from 'utils/analytics';

import ResultsList from '../results-list';

import { Wrapper, Container, ArrowIcon } from './styles';

const Dropdown = ({ selected, items }) => {
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef(null);

  const selectedItem =
    items && !!items.length && items.find((i) => i && i.id === selected);
  const selectedLabel = selectedItem && selectedItem.name;

  const handleClickOutside = (e) => {
    if (wrapperRef.current.contains(e.target)) {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Wrapper ref={wrapperRef}>
      <Container onClick={() => setOpen(!open)}>
        <span>{selectedLabel}</span>
        <ArrowIcon open={open} />
      </Container>
      {open && (
        <ResultsList
          items={items}
          selected={selected}
          onClickResult={(result) => {
            setOpen(false);
            trackEvent({
              category: 'Help Center',
              action: 'User clicks drop-down menu',
              label: `User navigates to ${result.name} page from drop-down menu`,
            });
          }}
          showCount={items?.some((i) => !!i.count)}
        />
      )}
    </Wrapper>
  );
};

Dropdown.propTypes = {
  items: PropTypes.array,
  selected: PropTypes.number,
};

export default Dropdown;
