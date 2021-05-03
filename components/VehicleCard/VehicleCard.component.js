import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Paper, Typography } from '@material-ui/core';
import { useBrands } from '../../hooks/brands';
import config from '../../config';

const VehicleCard = ({ vehicle }) => {
  const { query: { companyId, [config.site.queryParams.listingWithoutLayout]: withoutLayout } } = useRouter();
  const { map: brandsMap } = useBrands();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = vehicle.images || [];

  const className = classnames('VehicleCard VehicleCard__Container', {
    'VehicleCard--no-images': !images.length,
  });

  let vehicleDetailsURL = `/company/${companyId}/vehicles/${vehicle.id}`;
  if (withoutLayout) {
    vehicleDetailsURL = `${vehicleDetailsURL}?${config.site.queryParams.listingWithoutLayout}=${withoutLayout}`;
  }

  return (
    <Link href={vehicleDetailsURL} passHref>      
      <Paper className={className} component='a'>
        <div className="VehicleCard__Images">
          <div className="VehicleCard__Image__Container">
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                className={classnames('VehicleCard__Image', {
                  'VehicleCard__Image--active': activeImageIndex === i,
                  'VehicleCard__Image--prev': activeImageIndex - 1 === i,
                  'VehicleCard__Image--next': activeImageIndex + 1 === i,
                })}
              />
            ))}
          </div>
        </div>
        <div className="VehicleCard__Data">
          <div className="VehicleCard__Data__Title">
            <Typography variant="subtitle1" color="primary">
              {vehicle.name}
            </Typography>
          </div>
          <div className="VehicleCard__Data__Row">
            <div className="VehicleCard__Data__Brand">
              <Typography
                variant="caption"
                component="label"
                className="VehicleCard__Label"
              >
                Marca
              </Typography>
              <div className="VehicleCard__Data__Value">
                {brandsMap[vehicle.brand]
                  ? brandsMap[vehicle.brand].name
                  : vehicle.brand}
              </div>
            </div>
            <div className="VehicleCard__Data__Model">
              <Typography
                variant="caption"
                component="label"
                className="VehicleCard__Label"
              >
                Modelo
              </Typography>
              <div className="VehicleCard__Data__Value">{vehicle.model}</div>
            </div>
            <div className="VehicleCard__Data__Version">
              <Typography
                variant="caption"
                component="label"
                className="VehicleCard__Label"
              >
                Version
              </Typography>
              <div className="VehicleCard__Data__Value">{vehicle.version}</div>
            </div>
            <div className="VehicleCard__Data__Year">
              <Typography
                variant="caption"
                component="label"
                className="VehicleCard__Label"
              >
                Año
              </Typography>
              <div className="VehicleCard__Data__Value">{vehicle.year}</div>
            </div>
            <div className="VehicleCard__Data__Kms">
              <Typography
                variant="caption"
                component="label"
                className="VehicleCard__Label"
              >
                Kms.
              </Typography>
              <div className="VehicleCard__Data__Value">
                {vehicle.mileage ? vehicle.mileage.value : '-'}
              </div>
            </div>
          </div>
        </div>
        <div className="VehicleCard__Actions"></div>
      </Paper>
    </Link>
  );
};

VehicleCard.propTypes = {
  vehicle: PropTypes.object.isRequired,
};

export default VehicleCard;
