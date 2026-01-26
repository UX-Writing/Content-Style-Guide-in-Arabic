import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';

import { Container, Post } from './styles';

export default function Docs({ prev, next }) {
  return (
    <Container>
      {prev && (
        <Post>
          <Link to={prev.link}>
            <MdKeyboardArrowRight />
            <div>
              <p>السابق</p>
              <h3>{prev.label}</h3>
            </div>
          </Link>
        </Post>
      )}
      {next && (
        <Post isLeft>
          <Link to={next.link}>
            <div>
              <p>التالي</p>
              <h3>{next.label}</h3>
            </div>
            <MdKeyboardArrowLeft />
          </Link>
        </Post>
      )}
    </Container>
  );
}

Docs.propTypes = {
  prev: PropTypes.shape({
    label: PropTypes.string,
    link: PropTypes.string,
  }),
  next: PropTypes.shape({
    label: PropTypes.string,
    link: PropTypes.string,
  }),
};

Docs.defaultProps = {
  prev: null,
  next: null,
};
