import { Button, Typography } from '@material-ui/core';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import config from '../../config';

const CompanyData = ({ company }) => {
  const logo =
    !!company.images && !!company.images.length ? company.images[0] : null;

  const location = useMemo(() => {
    let location = '';
    if (company.street) {
      location = company.street;
    }

    if (company.area) {
      location = `${location}, ${company.area}`;
    }

    if (company.city) {
      location = `${location} (${company.city}`;
    }

    if (company.state) {
      location = `${location}, ${company.state}`;
    }

    if (company.city) {
      location = `${location})`;
    }

    return location;
  }, [company]);

  const className = classnames('CompanyData CompanyData__Container', {
    'CompanyData--no-logo': !logo,
  });

  const website =
    company.web &&
    (company.web.startsWith('http://') || company.web.startsWith('https://')
      ? company.web
      : 'http://' + company.web);

  return (
    <div className={className}>
      <div className="CompanyData__Header">
        <Typography
          variant="h6"
          color="primary"
          className="CompanyData__Header__Name"
        >
          {company.name}
        </Typography>
        <div className="CompanyData__Header__ButtonContainer">
          {company.phone && (
            <a
              href={config.site.social.whatsappContactURL.replace(
                'PHONE_NUMBER',
                company.phone
              )}
              target="_blank"
            >
              <Button
                variant="outlined"
                className="CompanyData__Header__ButtonContainer__Button CompanyData__Header__ButtonContainer__WhatsappButton"
                size="small"
                startIcon={<WhatsAppIcon />}
              >
                Whatsapp
              </Button>
            </a>
          )}
        </div>
      </div>

      <div className="CompanyData__Info">
        {!!logo && (
          <div className="CompanyData__Logo">
            <img src={logo} alt={`Logo de ${company.name}`} />
          </div>
        )}

        <div className="CompanyData__Group">
          <div className="CompanyData__Phone">
            <Typography variant="caption" component="label">
              Teléfono
            </Typography>
            <div className="CompanyData__Value">{company.phone}</div>
          </div>
          <div className="CompanyData__Email">
            <Typography variant="caption" component="label">
              Correo electrónico
            </Typography>
            <div className="CompanyData__Value">{company.email}</div>
          </div>
          {website && (
            <div className="CompanyData__Web">
              <Typography variant="caption" component="label">
                Sitio web
              </Typography>
              <div className="CompanyData__Value">
                <a href={website} target="_blank">
                  {company.web}
                </a>
              </div>
            </div>
          )}
          <div className="CompanyData__Location">
            <Typography variant="caption" component="label">
              Ubicación
            </Typography>
            <div className="CompanyData__Value">{location}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

CompanyData.propTypes = {
  company: PropTypes.object.isRequired,
};

export default CompanyData;
