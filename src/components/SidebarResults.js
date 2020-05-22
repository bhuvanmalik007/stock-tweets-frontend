import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

export default function SidebarResults({
  toggleActiveStock,
  feedStatus,
  results,
  removeStock,
}) {
  return (
    <List>
      {results.map((result, index) => (
        <ListItem
          key={result.symbol.id}
          button
          selected={result.symbol.symbol === feedStatus.selectedStockSymbol}
          onClick={(event) => toggleActiveStock(event, index)}
        >
          <ListItemText
            primary={`${result.symbol.symbol}(${result.messages.length} tweets)`}
            secondary={result.symbol.title}
          />
          <ListItemSecondaryAction>
            <Tooltip title="Stop real-time updates." aria-label="delete">
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={(event) => removeStock(event, index)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}

SidebarResults.propTypes = {
  toggleActiveStock: PropTypes.func.isRequired,
  feedStatus: PropTypes.object.isRequired,
  results: PropTypes.array.isRequired,
  removeStock: PropTypes.func.isRequired,
};
