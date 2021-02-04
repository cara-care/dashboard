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
import { currentUserSelector, loadingCurrentUserSelector } from '../../redux';
import { CardDetailSkeleton } from '../LoadingScreens';

const NOTES = [
  {
    id: 0,
    author: 'Kora',
    text: 'This user said something about an ingredient that he’s allergic to.',
  },
  {
    id: 1,
    author: 'Anastasija',
    text: 'There are other ingredients he still has not tried.',
  },
  {
    id: 2,
    author: 'Kora',
    text: 'Other notes',
  },
  {
    id: 3,
    author: 'Anastasija',
    text: 'Other notes',
  },
];

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
  const [expanded, setExpanded] = useState(false);
  const user = useSelector(currentUserSelector);
  const loadingUserData = useSelector(loadingCurrentUserSelector);

  const handleExpandClick = useCallback(() => {
    setExpanded((s) => !s);
  }, [setExpanded]);

  const onSubmit = (message: string) => {};

  if (loadingUserData) {
    return <CardDetailSkeleton />;
  }
  if (!user) {
    return null;
  }

  return (
    <Card className={classes.root}>
      <CardHeaderComp
        title={intl.formatMessage({
          id: 'common.notes',
          defaultMessage: 'Notes',
        })}
      />
      <NotesInput onSubmit={onSubmit} />
      <NotesList notes={NOTES.slice(0, 2)} />
      {NOTES.length > 2 ? (
        <>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <div className={classes.dividerBox}>
              <Divider />
            </div>
            <NotesList notes={NOTES.slice(2)} />
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
