import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Popover } from '@mui/material';
import dialogTypes from './EditDialogs';

const Editable = ({
  children,
  type,
  isEditable,
  fieldName,
  fieldValue,
  onEdit,
}) => {
  // Popover modal
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const popoverOpen = Boolean(anchorEl);

  // Edit Dialog modal
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleDialogClickOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const Dialog = dialogTypes[type];

  return isEditable ? (
    <React.Fragment>
      <div
        className="Editable__Overlay"
        aria-owns={popoverOpen ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onClick={handleDialogClickOpen}
      ></div>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={popoverOpen}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        TransitionProps={{ style: { transitionDelay: '500ms' } }}
        transitionDuration={{ appear: 1000, enter: 500, exit: 650 }}
      >
        <Typography className="Editable__Popover" variant="caption">
          Change {fieldName}
        </Typography>
      </Popover>
      <Dialog
        open={dialogOpen}
        fieldValue={fieldValue}
        handleDialogClose={handleDialogClose}
        onEditSubmit={onEdit}
      />
      {children}
    </React.Fragment>
  ) : (
    children
  );
};

Editable.defaultProps = {
  fieldName: 'field',
  isEditable: false,
  type: 'text',
};

Editable.propTypes = {
  type: PropTypes.string,
  fieldName: PropTypes.string,
  fieldValue: PropTypes.string,
  isEditable: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
};

export default Editable;
