import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl';
import {
  Button,
  Card,
  CardActions,
  Collapse,
  Divider,
} from '@material-ui/core';
import CardHeaderComp from './CardHeader';
import NotesInput from './NotesInput';
import NotesList from './NotesList';
import { useSelector } from 'react-redux';
import { notesSelector, getPatient } from '../../redux';
import { CardDetailSkeleton } from '../other/LoadingScreens';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 16,
    minWidth: 275,
    borderRadius: 12,
  },
  expand: {
    marginTop: -12,
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    textTransform: 'uppercase',
  },
  dividerBox: {
    padding: '0 8px',
    backgroundColor: 'rgba(216, 236, 235, 0.2)',
  },
  placeholder: {
    height: 16,
  },
}));

export default function NotesCard() {
  const classes = useStyles();
  const intl = useIntl();

  const notes = useSelector(notesSelector);
  const patient = useSelector(getPatient);

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = useCallback(() => {
    setExpanded((s) => !s);
  }, [setExpanded]);

  if (!patient) {
    return <CardDetailSkeleton />;
  }

  return (
    <Card className={classes.root}>
      <CardHeaderComp
        title={intl.formatMessage({
          id: 'common.notes',
          defaultMessage: 'Notes',
        })}
      />
      <NotesInput />
      {notes.length ? <NotesList notes={notes.slice(0, 2)} /> : null}
      {notes.length > 2 ? (
        <>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <div className={classes.dividerBox}>
              <Divider />
            </div>
            <NotesList notes={notes.slice(2)} />
          </Collapse>
          <CardActions style={{ marginTop: 16 }}>
            <Button
              className={classes.expand}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="expand"
              color="primary"
            >
              {expanded
                ? intl.formatMessage({
                    id: 'common.hide',
                    defaultMessage: 'Hide',
                  })
                : intl.formatMessage({
                    id: 'chat.seeMoreNotes',
                    defaultMessage: 'See More Notes',
                  })}
            </Button>
          </CardActions>
        </>
      ) : (
        <div className={classes.placeholder} />
      )}
    </Card>
  );
}
