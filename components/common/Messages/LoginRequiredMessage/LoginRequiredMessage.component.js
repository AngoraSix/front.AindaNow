import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Paper } from '@mui/material';

const LoginRequiredMessage = ({ message }) => {
  return (
    <Paper className="Message Message__LoginRequired" variant="outlined">
      <Typography>{message}</Typography>
    </Paper>
  );
};

LoginRequiredMessage.defaultProps = {
  message: 'Log in required to access this page',
};

LoginRequiredMessage.propTypes = {
  message: PropTypes.string,
};

export default LoginRequiredMessage;
