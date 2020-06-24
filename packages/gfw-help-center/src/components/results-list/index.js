import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';
import Link from '../link';

import { ListWrapper, ListItem, Divider } from './styles';

const ResultsList = ({
  items = [],
  libraries,
  onClickResult,
  selected,
  showCount,
}) => {
  const Html2React = libraries.html2react.Component;

  return (
    <ListWrapper>
      {items &&
        !!items.length &&
        items.map(
          (item) =>
            item && (
              <ListItem
                key={item.id || item.name}
                selected={item.id === selected}
              >
                {item.name === 'divider' ? (
                  <Divider />
                ) : (
                  <>
                    {item.link ? (
                      <Link link={item.link} onClick={onClickResult}>
                        <Html2React
                          html={`${item.name}${showCount ? ` (${item.count})` : ''}`}
                        />
                      </Link>
                      ) : (
                        <button onClick={item.onClick}>
                          <Html2React
                            html={`${item.name}${showCount ? ` (${item.count})` : ''}`}
                          />
                        </button>
                    )}
                  </>
                )}
              </ListItem>
            )
        )}
    </ListWrapper>
  );
};

export default connect(ResultsList);

ResultsList.propTypes = {
  items: PropTypes.object.isRequired,
  libraries: PropTypes.object,
  onClickResult: PropTypes.func,
  selected: PropTypes.number,
  showCount: PropTypes.bool,
};
