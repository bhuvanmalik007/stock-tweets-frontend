import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import TweetCard from './TweetCard';
import empty from '../assets/search.png';

const useStyles = makeStyles(({ mixins, spacing, transitions }) => ({
  content: {
    flexGrow: 1,
    height: '100%',
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#f8f9fa',
    padding: spacing(3),
    transition: transitions.create('margin', {
      easing: transitions.easing.sharp,
      duration: transitions.duration.leavingScreen,
    }),
    marginLeft: ({ drawerWidth }) => -drawerWidth,
  },
  content_shift: {
    transition: transitions.create('margin', {
      easing: transitions.easing.easeOut,
      duration: transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  tweetsHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: spacing(0, 1),
    // necessary for content to be below app bar
    ...mixins.toolbar,
    justifyContent: 'flex-end',
  },
  emptyView: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
}));

export default function Tweets({ feedStatus, results, open }) {
  const classes = useStyles();

  function renderResults() {
    if (!feedStatus.isFeedActive) return null;

    const currentResults = results.find(
      (result) => result.symbol.symbol === feedStatus.selectedStockSymbol,
    );

    return (
      <div className={classes.list}>
        <Typography variant="h4">{currentResults.symbol.title}</Typography>
        <Typography paragraph>
          Showing Tweets for
          {` ${feedStatus.selectedStockSymbol}`}
        </Typography>
        {currentResults.messages.map((message) => (
          <TweetCard message={message} key={message.id} />
        ))}
      </div>
    );
  }

  return (
    <main
      className={clsx(classes.content, {
        [classes.content_shift]: open,
      })}
    >
      <div className={classes.tweetsHeader} />
      {!feedStatus.isFeedActive && (
        <div className={classes.emptyView}>
          <img src={empty} alt="empty" />
          <Typography paragraph align="center" color="textSecondary">
            {` Welcome to Stock Tweets! Get started by searching for your
            favorite stocks to get all the buzz around them on Twitter in
            real-time.`}
          </Typography>
        </div>
      )}
      {renderResults()}
    </main>
  );
}

Tweets.propTypes = {
  feedStatus: PropTypes.shape({
    isFeedActive: PropTypes.bool,
    selectedStockSymbol: PropTypes.string,
  }).isRequired,
  results: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
};
