import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Thumbnail.css';

const Thumbnail = ({
  className,
  url,
  description,
  caption,
  width,
  height,
  size,
  position,
}) => (
  <figure
    className={classnames(
      'Thumbnail',
      (width || size) && `Thumbnail--width-${width || size}`,
      (height || size) && `Thumbnail--height-${height || size}`,
      position && `Thumbnail--${position}`,
      className,
    )}
  >
    <img className="Thumbnail__image" src={url} alt={description} />
    {caption && (
      <figcaption className="Thumbnail__caption">{caption}</figcaption>
    )}
  </figure>
);

Thumbnail.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  caption: PropTypes.string,
  width: PropTypes.oneOf(['fill', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl']),
  height: PropTypes.oneOf(['fill', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl']),
  size: PropTypes.oneOf(['fill', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl']),
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'center']),
};

export default Thumbnail;
