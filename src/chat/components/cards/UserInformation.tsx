import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import { CardDetailSkeleton } from '../other/LoadingScreens';
import { useSelector } from 'react-redux';
import { getPatient } from '../../redux';
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

  const patient = useSelector(getPatient);

  if (!patient) {
    return <CardDetailSkeleton />;
  }

  const userInformation = [
    // {
    //   key: intl.formatMessage({
    //     id: 'chat.key.userID',
    //     defaultMessage: 'User ID',
    //   }),
    //   value: patient.id,
    // },
    // {
    //   key: intl.formatMessage({
    //     id: 'chat.key.lastContact',
    //     defaultMessage: 'Last Contact',
    //   }),
    //   value: lastContact,
    //   component: lastContact ? (
    //     <Avatar alt="nutri image" className={classes.avatar}>
    //       A
    //     </Avatar>
    //   ) : undefined,
    // },
    {
      key: intl.formatMessage({
        id: 'chat.key.age',
        defaultMessage: 'Age',
      }),
      value: patient.age,
    },
    {
      key: intl.formatMessage({
        id: 'chat.key.sex',
        defaultMessage: 'Sex',
      }),
      value:
        patient.sex ??
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
      {/* <Button variant="outlined" size="small" className={classes.button}>
        {intl.formatMessage({
          id: 'chat.prescription',
          defaultMessage: 'Prescription',
        })}
      </Button> */}
      <CardBasicList cardDetailsValues={userInformation} />
    </Card>
  );
}
