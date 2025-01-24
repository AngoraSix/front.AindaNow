import { Box, Paper } from '@mui/material';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';
import LandingFooter from '../../components/Landing/LandingFooter';
import Navbar from '../../components/Navbar';
import config from '../../config';

const LandingLayout = ({ children, className, headData, contained = true }) => {
  const head = {
    ...config.site.head,
    ...headData,
  };
  const ChildrenContainer = contained ? Paper : 'div';
  return (
    <Box className={`LandingLayout LandingLayout__Container ${className}`}>
      <Head>
        <title>{head.title}</title>
        <meta property="og:title" key="og.title" content={head.title} />
        <meta
          property="og:description"
          key="og.description"
          content={head.description}
        />
        <meta
          property="og:image"
          key="og.image"
          itemProp="image"
          content={head.image.logo}
        />
      </Head>
      <Navbar />
      <ChildrenContainer className={`${className}__Body`}>
        {children}
      </ChildrenContainer>
      <LandingFooter />
    </Box>
  );
};

LandingLayout.defaultProps = {
  className: 'LandingLayout__Page',
  headData: {},
};

LandingLayout.propTypes = {
  className: PropTypes.string,
  headData: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default LandingLayout;
