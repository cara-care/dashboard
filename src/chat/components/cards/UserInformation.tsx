import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import { CardDetailSkeleton } from '../other/LoadingScreens';
import { useSelector } from 'react-redux';
import { getPatient } from '../../redux';
import CardHeaderComp from './CardHeader';
import CardBasicList from './CardBasicList';

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

  const patient = useSelector(getPatient);

  if (!patient) {
    return <CardDetailSkeleton />;
  }

  const userInfo = [
    {
      key: 'User ID',
      value: patient.username,
    },
    {
      key: 'Email',
      value: patient.email ?? '-',
    },
    {
      key: 'Code',
      value: patient.code ? patient.code : '-',
    },
    {
      key: 'Programme',
      value:
        patient.enrolledProgrammes.length === 0
          ? '-'
          : patient.enrolledProgrammes[0].title,
    },
    {
      key: 'First active',
      value: patient.dateJoined ?? '-',
    },
    {
      key: 'Last active',
      value: patient.lastSeen ?? '-',
    },
  ];

  const medicalInfo = [
    {
      key: 'Diseases',
      value: patient.diseases.length === 0 ? '-' : patient.diseases.join(', '),
    },
    {
      key: 'Allergies',
      value:
        patient.allergies.length === 0 ? '-' : patient.allergies.join(', '),
    },
    {
      key: 'Age',
      value: patient.age ?? '-',
    },
    {
      key: 'Gender',
      value: patient.sex ?? '-',
    },
  ];

  const deviceInfo = [
    {
      key: 'Operating system',
      value: patient.platform ?? '-',
    },
    {
      key: 'Build number',
      value: patient.appVersion ?? '-',
    },
    {
      key: 'Timezone',
      value: patient.timezone ?? '-',
    },
  ];

  return (
    <>
      <Card className={classes.root}>
        <CardHeaderComp title={'User'} />
        <CardBasicList cardDetailsValues={userInfo} />
      </Card>

      <Card className={classes.root}>
        <CardHeaderComp title={'Medical'} />
        <CardBasicList cardDetailsValues={medicalInfo} />
      </Card>

      <Card className={classes.root}>
        <CardHeaderComp title={'Device'} />
        <CardBasicList cardDetailsValues={deviceInfo} />
      </Card>
    </>
  );
}
