import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';
import config from '../../config';

const LandingLayout = ({ children, className, headData }) => {
  const head = {
    ...config.site.head,
    ...headData,
  };
  return (
    <div className={`LandingLayout LandingLayout__Container ${className}`}>
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
      <div className="LandingLayout__Body">{children}</div>
    </div>
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
