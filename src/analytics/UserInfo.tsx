import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: 'auto',
    display: 'block',
    [theme.breakpoints.up(400 + theme.spacing(6))]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  listItem: {
    paddingTop: '10px',
  },
  infoItem: {
    display: 'inline-table',
    width: '50%',
    paddingTop: '10px',
  },
  select: {
    width: '30%',
    height: '40px',
    border: '1px solid #ccc',
    borderRadius: '40px',
    paddingLeft: '15px',
    fontSize: '14px',
    fontFamily: 'Open Sans',
    color: '#555',
    backgroundColor: 'rgb(255, 255, 255)',
  },
  selectOption: {
    fontFamily: 'Open Sans',
    color: '#555',
    backgroundColor: 'rgb(247, 247, 247)',
    height: '50px',
    border: '1px solid rgb(41, 18, 18)',
  },
}));

interface UserInfoProps {
  userData: {};
}

const UserInfo = function ({ userData }: UserInfoProps) {
  const classes = useStyles();
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState('');

  useEffect(() => {
    setSelectedQuestionnaire('');
  }, [userData]);

  const handleQuestionnaire = (e: {
    preventDefault: () => void;
    target: { value: React.SetStateAction<string> };
  }) => {
    e.preventDefault();
    setSelectedQuestionnaire(e.target.value);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.infoItem}>
        <strong>Username: </strong>
        {userData['username']}
      </div>
      <div className={classes.infoItem}>
        <strong>Programme: </strong>
        {userData['programme']}
      </div>
      <div className={classes.infoItem}>
        <strong>Timezone: </strong>
        {userData['timezone']}
      </div>
      <div className={classes.infoItem}>
        <strong>Programme Started: </strong>
        {userData['programme_started']}
      </div>
      <div className={classes.infoItem}>
        <strong>Email Confirmed: </strong>
        {userData['email_confirmed'] ? 'True' : 'False'}
      </div>
      <div className={classes.infoItem}>
        <strong>Current Week: </strong>
        {userData['programme_week']}
      </div>
      <div className={classes.infoItem}>
        <strong>Code Activated: </strong>
        {userData['code_activated'] === true
          ? 'True'
          : userData['code_activated'] === false
          ? 'False'
          : userData['code_activated']}
      </div>
      <div className={classes.infoItem}>
        <strong>Allergies: </strong>
        {userData['allergies']}
      </div>
      <div className={classes.infoItem}>
        <strong>Account Created On: </strong>
        {userData['date_joined']}
      </div>
      <div className={classes.infoItem}>
        <strong>Modules: </strong>
        <ul>
          {userData['programme_modules'] &&
            userData['programme_modules'].map(
              (
                module: {} | null | undefined,
                i: string | number | undefined
              ) => (
                <li key={i}>
                  <span>{module}</span>
                </li>
              )
            )}
        </ul>
      </div>
      <div className={classes.infoItem}>
        <strong>Onboarding Done Date: </strong>
        {userData['onboarding_date']}
      </div>
      <div className={classes.infoItem}>
        <strong>Last Seen In App: </strong>
        {userData['last_seen']}
      </div>
      <div className={classes.infoItem}>
        <strong>App Version: </strong>
        {userData['app_version']}
      </div>
      <div className={classes.infoItem}>
        <strong>Disease: </strong>
        {userData['diseases']}
      </div>
      <div className={classes.infoItem}>
        <strong>Platform: </strong>
        {userData['platform']}
      </div>
      <div className={classes.infoItem}>
        <strong>User Groups: </strong>
        <ul>
          {userData['groups'] &&
            userData['groups'].map(
              (
                group: {} | null | undefined,
                i: string | number | undefined
              ) => (
                <li key={i}>
                  <span>{group}</span>
                </li>
              )
            )}
        </ul>
      </div>
      {userData['questionnaires'] && (
        <div>
          <strong>Questionnaires: </strong>
          <ul>
            {Object.entries(userData['questionnaires']).map(([slug]) => (
              <li key={slug}>
                <strong>{slug}: </strong>
                <span>
                  {userData['questionnaires'][slug]['completion_status']}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <br />
      {userData['user_answers'] && (
        <div>
          <strong>User Answers: </strong>
          <select
            onChange={handleQuestionnaire}
            value={selectedQuestionnaire}
            className={classes.select}
          >
            <option value="" className={classes.selectOption}>
              Select Questionnaire
            </option>
            {Object.entries(userData['questionnaires']).map(([slug]) => (
              <option key={slug} value={slug} className={classes.selectOption}>
                {slug}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectedQuestionnaire && (
        <div>
          <ul>
            {userData['user_answers'][selectedQuestionnaire].map(
              (answer: { [x: string]: React.ReactNode }, index: any) => {
                return (
                  <li key={index} className={classes.listItem}>
                    <span>
                      <strong>Slug: </strong>
                      {answer.slug}
                    </span>
                    <br />
                    <span>
                      <strong>Answer: </strong>
                      {answer.data ? JSON.stringify(answer.data) : 'None'}
                    </span>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
