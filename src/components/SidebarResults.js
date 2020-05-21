import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

export default ({ toggleActiveStock, feedStatus, results, removeStock }) => (
  <List>
    {results.map((result, index) => (
      <ListItem
        key={result.symbol.id}
        button
        selected={result.symbol.symbol === feedStatus.selectedStockSymbol}
        onClick={(event) => toggleActiveStock(event, index)}
      >
        <ListItemText
          primary={result.symbol.symbol}
          secondary={result.symbol.title}
        />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={(event) => removeStock(event, index)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ))}
  </List>
);
