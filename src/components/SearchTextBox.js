import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  flexDiv: {
    display: 'flex',
    flexDirection: 'column',
    margin: '100',
  },
  searchTextBox: {
    margin: 20,
  },
});

export default function SearchTextBox({
  searchString,
  handleChange,
  handleSearch,
}) {
  const classes = useStyles();

  return (
    <div className={classes.flexDiv}>
      <TextField
        className={classes.searchTextBox}
        id="standard-multiline-flexible"
        label="Search stocks"
        rowsMax={4}
        value={searchString}
        onChange={handleChange}
        onKeyDown={handleSearch}
        placeholder="EX: AMZN, AAPL, NFLX"
      />
      <Button
        color="primary"
        variant="contained"
        onClick={() => handleSearch()}
      >
        Search
      </Button>
    </div>
  );
}

SearchTextBox.propTypes = {
  searchString: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};
