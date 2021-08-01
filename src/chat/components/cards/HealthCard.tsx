import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Divider, Typography } from '@material-ui/core';
import { CardDetailSkeleton } from '../other/LoadingScreens';
import { useSelector } from 'react-redux';
import { ChatUser, getPatient } from '../../redux';
import CardHeaderComp from './CardHeader';
import { useIntl } from 'react-intl';

const useStyles = makeStyles((_theme) => ({
  root: {
    marginTop: 16,
    minWidth: 275,
    borderRadius: 12,
    paddingBottom: 24,
  },
  divider: {
    margin: '8px 12px',
  },
}));

const shortDiagnosisRegex = /\[(.*?)\]/;
const prepareDiagnosis = (patient: ChatUser) =>
  patient.diagnosis
    .split(':')
    .slice(1)
    .map((diagnosis) => {
      const isShortDiagnosisName = diagnosis.match(shortDiagnosisRegex);
      return isShortDiagnosisName ? isShortDiagnosisName[1] : diagnosis;
    })
    .join(', ');

export default function HealthCard() {
  const classes = useStyles();
  const intl = useIntl();

  const patient = useSelector(getPatient);

  if (!patient) {
    return <CardDetailSkeleton />;
  }

  const healthInformation = [
    {
      key: intl.formatMessage({
        id: 'chat.key.diagnosis',
        defaultMessage: 'Diagnosis',
      }),
      value: prepareDiagnosis(patient),
      divider: false,
    },
    // {
    //   key: intl.formatMessage({
    //     id: 'chat.key.qualityOfLife',
    //     defaultMessage: 'Quality of life',
    //   }),
    //   value: 'Mild improvement',
    // },
    // {
    //   key: intl.formatMessage({
    //     id: 'common.symptomScore',
    //     defaultMessage: 'Symptom Score S',
    //   }),
    //   value: 'Diminished',
    // },
  ];

  return (
    <Card className={classes.root}>
      <CardHeaderComp
        title={intl.formatMessage({
          id: 'chat.healthCard',
          defaultMessage: 'Health card',
        })}
      />
      {healthInformation.map((info) => {
        const { key, value, divider } = info;
        return (
          <Fragment key={key}>
            <div
              style={{
                display: 'flex',
                alignItems: divider ? 'flex-start' : 'center',
                flexDirection: divider ? 'column' : 'row',
                padding: '0 16px',
              }}
            >
              <Typography color="primary" style={{ marginRight: 8 }}>
                {key}:
              </Typography>
              <Typography variant="body2">{value}</Typography>
            </div>
            {divider && <Divider className={classes.divider} />}
          </Fragment>
        );
      })}
    </Card>
  );
}
