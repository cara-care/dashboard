import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '90%',
      margin: '0 auto',
      borderRadius: 25,
      marginTop: 48,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
      paddingRight: 8,
    },
    iconButton: {
      padding: 10,
    },
  })
);

export default function SearchInput() {
  const [text, setText] = useState('');
  const classes = useStyles();

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!text) {
      return;
    } else {
      alert(text);
      setText('');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search google maps' }}
        value={text}
        onChange={handleChange}
      />
    </Paper>
  );
}
