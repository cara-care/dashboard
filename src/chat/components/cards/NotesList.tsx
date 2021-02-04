import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Typography } from '@material-ui/core';

const useStyles = makeStyles((_theme) => ({
  list: {
    padding: 8,
    backgroundColor: 'rgba(216, 236, 235, 0.2)',
  },
  divider: {
    margin: '8px 0',
  },
}));

export interface NoteItem {
  id: number;
  author: string;
  text: string;
}

export default function NotesList({ notes }: { notes: NoteItem[] }) {
  const classes = useStyles();

  return (
    <div className={classes.list}>
      {notes.map((note, index) => {
        const { id, author, text } = note;
        const isLast = index === notes.length - 1;
        return (
          <div key={id}>
            <Typography
              variant="body2"
              color="primary"
              style={{ marginBottom: 8 }}
            >
              {author}
            </Typography>
            <Typography variant="body2" color="textPrimary">
              {text}
            </Typography>
            {!isLast && <Divider className={classes.divider} />}
          </div>
        );
      })}
    </div>
  );
}
