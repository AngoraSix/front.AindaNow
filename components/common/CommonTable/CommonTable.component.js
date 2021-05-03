import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  Button,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/SearchRounded';
import Skeleton from '@material-ui/lab/Skeleton';

const CommonTable = ({
  className,
  tableConfig,
  total,
  rows,
  isLoading,
  rowActionsComponent: RowActionsComponent,
  displayTotal,
  search,
  onSearch,
  onRowClick,
  onLoadMore,
}) => {
  const containerClassName = classnames(
    `CommonTable CommonTable__Container ${className}`,
    {
      'CommonTable--selectable': onRowClick,
      'CommonTable--searchable': onSearch,
      'CommonTable--loadable': onLoadMore,
      'CommonTable--loading': isLoading,
      'CommonTable--withTotal': displayTotal,
      'CommonTable--withoutTotal': !displayTotal,
    }
  );

  return (
    <div className={containerClassName}>
      {(displayTotal || !!onSearch) && (
        <Toolbar className="CommonTable__Toolbar">
          {displayTotal && (
            <div className="CommonTable__Toolbar__Column">
              <Typography>Total: {total}</Typography>
            </div>
          )}
          {!!onSearch && (
            <div className="CommonTable__Toolbar__Column">
              <TextField
                value={search}
                onChange={onSearch}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </div>
          )}
        </Toolbar>
      )}

      <div className="CommonTable__TableContainer">
        <Table className="CommonTable__Table">
          <TableHead className="CommonTable__Table__Head">
            <TableRow className="CommonTable__Table__Row">
              {tableConfig.map(({ label, props = {} }, i) => (
                <TableCell
                  key={i}
                  className="CommonTable__Table__Cell"
                  {...props}
                >
                  {label}
                </TableCell>
              ))}
              {!!RowActionsComponent && (
                <TableCell className="CommonTable__Table__Cell">
                  Acciones
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody className="CommonTable__Table__Body">
            {rows.map((row, index) => (
              <TableRow
                key={row.id}
                className="CommonTable__Table__Row"
                onClick={onRowClick ? onRowClick(row, index) : () => {}}
              >
                {tableConfig.map(
                  ({ property, transformFn = null, props = {} }, i) => (
                    <TableCell
                      key={i}
                      className={`CommonTable__Table__Cell CommonTable__Table__Cell--${property}`}
                      {...props}
                    >
                      {transformFn ? transformFn(row[property]) : row[property]}
                    </TableCell>
                  )
                )}

                {!!RowActionsComponent && (
                  <TableCell className="CommonTable__Table__Cell CommonTable__Table__Cell--actions">
                    <RowActionsComponent row={row} />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* {!isLoading && !rows.length && (
        <div className="CommonTable__EmptyMessage">
          <Typography variant="caption" align="center">
            No hay resultados.
          </Typography>
        </div>
      )} */}

      {isLoading && (
        <div className="CommonTable__Table--loading">
          <Skeleton variant="rect" />
          <Skeleton variant="rect" />
          <Skeleton variant="rect" />
          <Skeleton variant="rect" />
        </div>
      )}

      {!!onLoadMore && !isLoading && (
        <div className="CommonTable__LoadMore">
          <Button onClick={onLoadMore}>Cargar más</Button>
        </div>
      )}
    </div>
  );
};

CommonTable.defaultProps = {
  className: 'CommonTable__Default',
  rows: [],
  isLoading: false,
  total: 0,
  displayTotal: true,
  search: '',
  onSearch: null,
  onLoadMore: null,
  onRowClick: null,
  rowActionsComponent: null,
};

CommonTable.propTypes = {
  className: PropTypes.string,
  rows: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  total: PropTypes.number,
  displayTotal: PropTypes.bool,
  search: PropTypes.string,
  onSearch: PropTypes.func,
  onLoadMore: PropTypes.func,
  onRowClick: PropTypes.func,
  rowActionsComponent: PropTypes.elementType,
  tableConfig: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      property: PropTypes.string.isRequired,
      props: PropTypes.object,
    })
  ).isRequired,
};

export default CommonTable;
