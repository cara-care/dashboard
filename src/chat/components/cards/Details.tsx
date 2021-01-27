import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardActions, Collapse } from '@material-ui/core';
import { CardDetailSkeleton } from '../LoadingScreens';
import { useSelector } from 'react-redux';
import {
  currentUserSelector,
  lastHeardFromSelector,
  loadingCurrentUserSelector,
} from '../../redux';
import CardHeaderComp from './CardHeader';
import CardBasicList from './CardBasicList';
import { useIntl } from 'react-intl';

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
  },
}));

export default function Details() {
  const classes = useStyles();
  const intl = useIntl();
  const user = useSelector(currentUserSelector);
  const loadingUserData = useSelector(loadingCurrentUserSelector);
  const lastHeardFrom = useSelector(lastHeardFromSelector);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = useCallback(() => {
    setExpanded((s) => !s);
  }, [setExpanded]);

  if (loadingUserData) {
    return <CardDetailSkeleton />;
  }
  if (!user) {
    return null;
  }

  const userDetails = [
    {
      key: intl.formatMessage({
        id: 'chat.key.backendID',
        defaultMessage: 'Back-end ID',
      }),
      value: user.username,
    },
    {
      key: intl.formatMessage({
        id: 'chat.key.phoneOS',
        defaultMessage: 'Phone OS',
      }),
      value: user.platform,
    },
    {
      key: intl.formatMessage({
        id: 'chat.key.firstSeen',
        defaultMessage: 'First Seen',
      }),
      value: user.dateJoined,
    },
    {
      key: intl.formatMessage({
        id: 'chat.key.lastSeen',
        defaultMessage: 'Last Seen',
      }),
      value: user.lastSeen,
    },
    {
      key: intl.formatMessage({
        id: 'chat.key.lastHeard',
        defaultMessage: 'Last heard from',
      }),
      value: lastHeardFrom,
    },
  ];

  const userDetailsExpanded = [
    {
      key: intl.formatMessage({
        id: 'chat.key.email',
        defaultMessage: 'Email',
      }),
      value:
        user.email ??
        intl.formatMessage({
          id: 'chat.key.notSpecified',
          defaultMessage: 'not specified',
        }),
    },
    {
      key: intl.formatMessage({
        id: 'chat.key.timezone',
        defaultMessage: 'Timezone',
      }),
      value: user.timezone,
    },
  ];

  return (
    <Card className={classes.root}>
      <CardHeaderComp
        title={intl.formatMessage({
          id: 'common.details',
          defaultMessage: 'Details',
        })}
      />
      <CardBasicList cardDetailsValues={userDetails} />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardBasicList cardDetailsValues={userDetailsExpanded} />
      </Collapse>
      <CardActions>
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
                id: 'common.expand',
                defaultMessage: 'Expand',
              })}
        </Button>
      </CardActions>
    </Card>
  );
}
