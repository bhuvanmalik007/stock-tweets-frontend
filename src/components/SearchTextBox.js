import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  searchTextBox: {
    margin: 20,
  },
});

export default function SearchTextBox({
  searchString,
  handleChange,
  handleEnter,
}) {
  const classes = useStyles();

  return (
    <TextField
      className={classes.searchTextBox}
      id="standard-multiline-flexible"
      label="Search stock"
      rowsMax={4}
      value={searchString}
      onChange={handleChange}
      onKeyDown={handleEnter}
      placeholder="EX: AMZN, AAPL, NFLX"
    />
  );
}

SearchTextBox.propTypes = {
  searchString: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleEnter: PropTypes.func.isRequired,
};
