import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Image, Wrapper, Backdrop, LightboxImg } from './styles';

const Lightbox = ({ src, alt, key }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Image src={src} alt={alt} key={key} onClick={() => setOpen(true)} />

      {open && (
        <Wrapper onClick={() => setOpen(false)}>
          <Backdrop />
          <LightboxImg src={src} alt={alt} key={key} />
        </Wrapper>
      )}
    </>
  );
};

Lightbox.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  key: PropTypes.string,
};

export default Lightbox;
