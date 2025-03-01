/* @jsx jsx */
import { useState, useRef, Fragment } from 'react';
import { jsx } from '@emotion/react';
import PropTypes from 'prop-types';

import TableOfContents from '../Docs/TOC';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Overlay from '../Overlay';
import { Container, Main, Children } from './styles';

export default function Layout({
  children,
  // eslint-disable-next-line no-unused-vars
  title,
  disableTableOfContents,
  headings,
}) {
  const contentRef = useRef(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const disableTOC =
    disableTableOfContents === true || !headings || headings.length === 0;

  const handleMenuOpen = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <Fragment>
      <Overlay isMenuOpen={isMenuOpen} onClick={handleMenuOpen} />
      <Container>
        <Sidebar isMenuOpen={isMenuOpen} />
        <Main>
          <Header handleMenuOpen={handleMenuOpen} />
          <Children ref={contentRef}>{children}</Children>
          <TableOfContents
            headings={headings}
            disableTOC={disableTOC}
            contentRef={contentRef}
          />
        </Main>
      </Container>
    </Fragment>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  disableTableOfContents: PropTypes.bool,
  // eslint-disable-next-line no-bitwise
  title: PropTypes.string | undefined,
  headings: PropTypes.array,
};

Layout.defaultProps = {
  disableTableOfContents: false,
  title: '',
  headings: null,
};
