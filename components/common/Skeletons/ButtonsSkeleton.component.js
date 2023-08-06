import { Grid, Skeleton } from '@mui/material';
const ButtonsSkeleton = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Skeleton className="ButtonsSkeleton__Button" variant="rounded" />
      </Grid>
      <Grid item xs={4}>
        <Skeleton className="ButtonsSkeleton__Button" variant="rounded" />
      </Grid>
      <Grid item xs={4}>
        <Skeleton className="ButtonsSkeleton__Button" variant="rounded" />
      </Grid>
    </Grid>
  );
};

ButtonsSkeleton.defaultProps = {};

ButtonsSkeleton.propTypes = {};

export default ButtonsSkeleton;
