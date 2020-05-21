import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import useSWR from 'swr';
import LinearProgress from '@material-ui/core/LinearProgress';
import SearchTextBox from './components/SearchTextBox';
import SidebarResults from './components/SidebarResults';
import Tweets from './components/Tweets';
import HideOnScroll from './components/HideOnScroll';

const url = 'http://localhost:3000/dev/unlock?url=';
const stockTwitsUrl = 'https://api.stocktwits.com/api/2/streams/symbol/';
const stockTwitsUrlBuilder = (baseUrl, symbol) => `${baseUrl + symbol}.json`;

const drawerWidth = 300;

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const useStyles = makeStyles(({ mixins, spacing, transitions, zIndex }) => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  appBar: {
    transition: transitions.create(['margin', 'width'], {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.leavingScreen,
    }),
    zIndex: zIndex.drawer + 1,
  },
  appBar_shift: {
    marginLeft: drawerWidth,
    transition: transitions.create(['margin', 'width'], {
      easing: transitions.easing.easeOut,
      duration: transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,

    transition: transitions.create('width', {
      easing: transitions.easing.easeOut,
      duration: transitions.duration.enteringScreen,
    }),
  },
  drawer_closed: {
    width: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: spacing(0, 1),
    // necessary for content to be below app bar
    ...mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

function App() {
  // State
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [stockTwitsRequestUrlArray, setStockTwitsRequestUrlArray] = useState(
    [],
  );
  const [feedStatus, setFeedStatus] = useState({
    isFeedActive: false,
    selectedStockSymbol: null,
  });
  const [results, setResults] = useState([]);
  const [sideBarLoader, setSideBarLoader] = useState(false);
  const [searchString, setSearchString] = useState('');

  // SWR
  useSWR(
    stockTwitsRequestUrlArray.length ? url + stockTwitsRequestUrlArray : null,
    fetcher,
    {
      onSuccess: (data) => {
        setSideBarLoader(false);
        setResults(data.data.filter((result) => !result.errors));
        setStockTwitsRequestUrlArray(
          data.data
            .filter((result) => !result.errors)
            .map((result) => result.symbol.symbol)
            .map((symbol) => stockTwitsUrlBuilder(stockTwitsUrl, symbol)),
        );
      },
      refreshInterval: 0,
    },
  );

  // Event handlers
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleChange = (event) => {
    setSearchString(event.target.value);
  };

  const handleEnter = (event) => {
    if (event.keyCode !== 13 || event.target.value.trim() === '') return;
    setSideBarLoader(true);
    setSearchString('');
    const requestedStocksList = event.target.value
      .split(',')
      .map((symbol) => symbol.trim().toUpperCase());
    let combinedStocksList = [
      ...requestedStocksList,
      ...results.map((result) => result.symbol.symbol),
    ];

    combinedStocksList = [...new Set(combinedStocksList)];
    const updatedStockTwitsRequestUrlArray = combinedStocksList.map((symbol) =>
      stockTwitsUrlBuilder(stockTwitsUrl, symbol),
    );
    setStockTwitsRequestUrlArray(updatedStockTwitsRequestUrlArray);
  };

  const toggleActiveStock = (event, selectedIndex) => {
    setFeedStatus({
      isFeedActive: true,
      selectedStockSymbol: results[selectedIndex].symbol.symbol,
    });
  };

  const removeStock = (event, selectedIndex) => {
    setResults(results.filter((_, index) => index !== selectedIndex));
    if (
      results[selectedIndex].symbol.symbol === feedStatus.selectedStockSymbol
    ) {
      setFeedStatus({
        isFeedActive: false,
        selectedStockSymbol: null,
      });
    }
    const updatedUrls = stockTwitsRequestUrlArray.filter(
      (_, index) => index !== selectedIndex,
    );
    setStockTwitsRequestUrlArray(updatedUrls);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <HideOnScroll>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              edge="start"
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Stock Tweets
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <Drawer
        className={clsx(classes.drawer, { [classes.drawer_closed]: !open })}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader} />
        <Divider />
        <SearchTextBox
          searchString={searchString}
          handleChange={handleChange}
          handleEnter={handleEnter}
        />
        {sideBarLoader && <LinearProgress />}
        <SidebarResults
          toggleActiveStock={toggleActiveStock}
          feedStatus={feedStatus}
          results={results}
          removeStock={removeStock}
        />
        <Divider />
      </Drawer>

      <Tweets
        drawerWidth={drawerWidth}
        feedStatus={feedStatus}
        results={results}
        open={open}
      />
    </div>
  );
}

export default App;
