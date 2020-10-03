import React from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Warning } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { getPatientTimezone, getPatientEnrolledPrograms } from '../../auth';
import NutriNavigation from '../../components/NutriNavigation';
import { formatDate } from '../../utils/dateUtils';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(3),
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    // 100vh - (header height + container padding + nuriNavigation Height)px
    height: `calc(100vh - ${theme.spacing(8) + theme.spacing(3) + 67}px)`,
  },
}));

const Programs = () => {
  const classes = useStyles();
  const timezone = useSelector(getPatientTimezone);
  const programs = useSelector(getPatientEnrolledPrograms);
  const { locale } = useIntl();

  return (
    <>
      <NutriNavigation />
      <Container className={classes.container}>
        <Grid container spacing={2}>
          {programs.length ? (
            programs.map((program) => (
              <Grid key={program.id} item xs={12} md={6} lg={4}>
                <Card>
                  <CardMedia component="img" image={program.image} />
                  <CardContent>
                    <Typography gutterBottom variant="h6">
                      {program.title}
                    </Typography>
                    <Typography variant="body2" component="p">
                      <FormattedMessage
                        id="programs.programStarted"
                        defaultMessage="Program started: {date}"
                        values={{
                          date: formatDate(program.started, 'LLL', locale),
                          timezone,
                        }}
                      />
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <div className={classes.center}>
              <Warning color="error" />
              <Typography variant="body2">
                <FormattedMessage
                  id="programs.notEnrolledInAnyPrograms"
                  defaultMessage="Patient is not enrolled in any programs."
                />
              </Typography>
            </div>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Programs;
