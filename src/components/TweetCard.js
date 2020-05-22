import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

const useStyles = makeStyles(({ breakpoints, transitions }) => ({
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    width: 900,
    [breakpoints.down('sm')]: {
      width: 400,
    },
    [breakpoints.up('md')]: {
      width: 600,
    },
    [breakpoints.up('lg')]: {
      width: 900,
    },
    transition: transitions.create('all', {
      easing: transitions.easing.easeIn,
      duration: transitions.duration.short,
    }),

    '& + &': {
      marginTop: 20,
    },

    '&:hover': {
      borderLeft: 'solid 5px #3f51b5',
    },
  },
  body: {
    fontFamily: "'Muli', sans-serif",
    fontSize: '1.25rem',
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

export default function TweetCard({ message }) {
  const classes = useStyles();
  const getTimestamp = (createdAt) => moment(createdAt).calendar();

  return (
    <Card
      className={classes.cardContainer}
      key={message.id}
      variant="outlined"
      onClick={() =>
        window.open(
          `https://stocktwits.com/${message.user.username}/message/${message.id}`,
        )
      }
    >
      <CardHeader
        disableTypography
        avatar={
          <Avatar alt={message.user.name} src={message.user.avatar_url} />
        }
        title={message.user.name}
        subheader={
          <div className={classes.cardContainer.cardHeader}>
            <Typography color="textSecondary">
              {`@${message.user.username}`}
            </Typography>
            <Typography color="textSecondary">
              {getTimestamp(message.created_at)}
            </Typography>
          </div>
        }
      />
      <CardContent>
        <Typography gutterBottom className={classes.body}>
          {message.body}
        </Typography>
      </CardContent>
    </Card>
  );
}

TweetCard.propTypes = {
  message: PropTypes.shape({
    body: PropTypes.string,
    id: PropTypes.number,
    created_at: PropTypes.string,
    user: PropTypes.shape({
      avatar_url: PropTypes.string,
      name: PropTypes.string,
      username: PropTypes.string,
    }),
  }).isRequired,
};
