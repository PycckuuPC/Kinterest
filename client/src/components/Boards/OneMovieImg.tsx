import { Grid } from '@mui/material';

export default function OneMovieImg({ movie, header }): JSX.Element {
  return (
    movie?.poster_path && (
      <Grid item xs={6} sm={3}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
          alt="image1"
          width={header ? '160' : '80'}
          height="80"
        />
      </Grid>
    )
  );
}
