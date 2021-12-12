import { Typography } from '@mui/material';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';
import Carousel from '../common/Carousel';
import VehicleComfortItemsSection from './Sections/VehicleComfortItemsSection.component';
import VehicleDataSection from './Sections/VehicleDataSection.component';
import VehicleSecurityItemsSection from './Sections/VehicleSecurityItemsSection.component';

const ViewVehicle = ({ vehicle }) => {
  if (!vehicle) {
    return null;
  }

  return (
    <div className="ViewVehicle ViewVehicle__Container">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/fonts/Ruluko.css" />
        <link rel="stylesheet" href="/fonts/ZCool.css" />
        <meta property="og:title" key="og.title" content={vehicle.name} />
        <meta
          property="og:description"
          key="og.description"
          content={vehicle.description}
        />
        <meta
          property="og:image"
          key="og.image"
          itemProp="image"
          content={
            vehicle.thumbnailImages &&
            vehicle.thumbnailImages.length &&
            vehicle.thumbnailImages[0]
          }
        />
      </Head>
      <div className="ViewVehicle__Header">
        <Typography variant="h6" color="primary">
          {vehicle.name}
        </Typography>
      </div>

      <div className="ViewVehicle__Grid">
        <div className="ViewVehicle__Images">
          <Carousel images={vehicle.images} />
        </div>

        <VehicleDataSection vehicle={vehicle} />
      </div>

      <div className="ViewVehicle__Grid ViewVehicle__Grid--11">
        <VehicleSecurityItemsSection vehicle={vehicle} />

        <VehicleComfortItemsSection vehicle={vehicle} />
      </div>
    </div>
  );
};

ViewVehicle.defaultProps = {
  vehicle: null,
};

ViewVehicle.propTypes = {
  vehicle: PropTypes.object,
};

export default ViewVehicle;
