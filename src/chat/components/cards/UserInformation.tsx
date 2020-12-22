import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Card } from '@material-ui/core';
import { CardDetailSkeleton } from '../LoadingScreens';
import { useSelector } from 'react-redux';
import { currentUserSelector, loadingCurrentUserSelector } from '../../redux';
import CardHeaderComp from './CardHeader';
import CardBasicList from './CardBasicList';
import { useIntl } from 'react-intl';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 16,
    minWidth: 275,
    borderRadius: 12,
  },
  button: {
    marginLeft: 16,
    color: theme.palette.text.primary,
    borderColor: theme.palette.primary.main,
    fontSize: 10,
    textTransform: 'uppercase',
  },
  avatar: {
    height: 20,
    width: 20,
    margin: '0 4px',
  },
}));

export default function UserInformation() {
  const classes = useStyles();
  const intl = useIntl();
  const user = useSelector(currentUserSelector);
  const loadingUserData = useSelector(loadingCurrentUserSelector);

  if (loadingUserData) {
    return <CardDetailSkeleton />;
  }
  if (!user) {
    return null;
  }

  const userInformation = [
    {
      key: intl.formatMessage({
        id: 'chat.key.userID',
        defaultMessage: 'User ID',
      }),
      value: user.id,
    },
    {
      key: intl.formatMessage({
        id: 'chat.key.lastContact',
        defaultMessage: 'Last Contact',
      }),
      value: 'Alina',
      component: (
        <Avatar alt="nutri image" className={classes.avatar}>
          A
        </Avatar>
      ),
    },
    {
      key: intl.formatMessage({
        id: 'chat.key.age',
        defaultMessage: 'Age',
      }),
      value: user.age,
    },
    {
      key: intl.formatMessage({
        id: 'chat.key.sex',
        defaultMessage: 'Sex',
      }),
      value:
        user.sex ??
        intl.formatMessage({
          id: 'chat.key.notSpecified',
          defaultMessage: 'not specified',
        }),
    },
  ];

  return (
    <Card className={classes.root}>
      <CardHeaderComp
        title={intl.formatMessage({
          id: 'chat.userInformation',
          defaultMessage: 'User Information',
        })}
      />
      <Button variant="outlined" size="small" className={classes.button}>
        {intl.formatMessage({
          id: 'chat.prescription',
          defaultMessage: 'Prescription',
        })}
      </Button>
      <CardBasicList cardDetailsValues={userInformation} />
    </Card>
  );
}
