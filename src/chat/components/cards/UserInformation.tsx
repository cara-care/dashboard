import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Card } from '@material-ui/core';
import { CardDetailSkeleton } from '../LoadingScreens';
import { useSelector } from 'react-redux';
import { currentUserSelector, loadingCurrentUserSelector } from '../../redux';
import CardHeaderComp from './CardHeader';
import CardBasicList from './CardBasicList';
import { useIntl } from 'react-intl';
import moment from 'moment';

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
    { key: 'User ID', value: user.id },
    {
      key: 'Last Contact',
      value: 'Alina',
      component: (
        <Avatar alt="nutri image" className={classes.avatar}>
          A
        </Avatar>
      ),
    },
    {
      key: 'Age',
      value: Math.ceil(moment(Date.now()).diff(user.birthdate, 'years', true)),
    },
    { key: 'Sex', value: user.sex ?? 'not specified' },
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
        PRESCRIPTION
      </Button>
      <CardBasicList cardDetailsValues={userInformation} />
    </Card>
  );
}
