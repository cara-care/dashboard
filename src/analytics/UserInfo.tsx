import React, { useState } from 'react';

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
    width: '50%',
    height: '40px',
    border: '1px solid #ccc',
    borderRadius: '40px',
    paddingLeft: '15px',
    fontSize: '14px',
    fontFamily: 'Open Sans',
    color: '#555',
    backgroundColorolor: 'rgb(255, 255, 255)',
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
        <strong>Email Confirmed: </strong>
        {userData['email_confirmed'] ? 'True' : 'False'}
      </div>
      <div className={classes.infoItem}>
        <strong>Timezone: </strong>
        {userData['timezone']}
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
        <strong>Onboarding Done Date: </strong>
        {userData['onboarding_date']}
      </div>
      <div className={classes.infoItem}>
        <strong>Account Created On: </strong>
        {userData['date_joined']}
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
        <strong>Allergies: </strong>
        {userData['allergies']}
      </div>
      <div className={classes.infoItem}>
        <strong>Platform: </strong>
        {userData['platform']}
      </div>
      <div className={classes.infoItem}>
        <strong>Programme: </strong>
        {userData['programme']}
      </div>
      <div className={classes.infoItem}>
        <strong>Programme Started: </strong>
        {userData['programme_started']}
      </div>
      <div className={classes.infoItem}>
        <strong>Current Week: </strong>
        {userData['programme_week']}
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
        <strong>T0 Completed: </strong>
        {userData['t0_completed']}
      </div>
      <div className={classes.infoItem}>
        <strong>T1 Completed: </strong>
        {userData['t1_completed']}
      </div>
      <div className={classes.infoItem}>
        <strong>T2 Completed: </strong>
        {userData['t2_completed']}
      </div>
      <div className={classes.infoItem}>
        <strong>T3 Completed: </strong>
        {userData['t3_completed']}
      </div>
      <div className={classes.infoItem}>
        <strong>T4 Completed: </strong>
        {userData['t4_completed']}
      </div>
      <div className={classes.infoItem}>
        <strong>T5 Completed: </strong>
        {userData['t5_completed']}
      </div>
      <div className={classes.infoItem}>
        <strong>T6 Completed: </strong>
        {userData['t6_completed']}
      </div>
      <br />
      <div className={classes.infoItem}>
        <strong>User Answers: </strong>
        <select
          onChange={handleQuestionnaire}
          value={selectedQuestionnaire}
          className={classes.select}
        >
          <option value="" className={classes.selectOption}>
            Select Questionnaire
          </option>
          <option value="t0_answers" className={classes.selectOption}>
            T0 Answers
          </option>
          <option value="t1_answers" className={classes.selectOption}>
            T1 Answers
          </option>
          <option value="t2_answers" className={classes.selectOption}>
            T2 Answers
          </option>
          <option value="t3_answers" className={classes.selectOption}>
            T3 Answers
          </option>
          <option value="t4_answers" className={classes.selectOption}>
            T4 Answers
          </option>
          <option value="t5_answers" className={classes.selectOption}>
            T5 Answers
          </option>
          <option value="t6_answers" className={classes.selectOption}>
            T6 Answers
          </option>
        </select>
      </div>
      {selectedQuestionnaire && (
        <div>
          <strong>Answers: </strong>
          <ul>
            {}
            {userData[selectedQuestionnaire].map(
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
