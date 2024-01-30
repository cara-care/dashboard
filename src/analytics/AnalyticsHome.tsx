import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';

import {
  getUserGroups,
  isAuthenticated as isAuthenticatedSelector,
} from '../auth';
import { searchUser, userActions } from '../utils/api';
import UserInfo from './UserInfo';
import { Button, Typography } from '@material-ui/core';
import Modal from '../components/Modal';
import { PRIMARY_COLOR } from '../theme';
import userActionsList from './userActionsList.json';

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
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  searchBarPaper: {
    p: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  iconBtn: {
    p: '10px',
  },
  inputBase: {
    marginLeft: '10px',
    ml: 10,
    flex: 1,
  },
  error: {
    color: 'red',
  },
  listItem: {
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
  userActions: {
    width: '53%',
  },
  deleteButton: {
    padding: '10px 20px',
    margin: '5px',
    marginTop: '20px',
    backgroundColor: theme.palette.secondary.main,
    color: '#FA5544',
    border: 'none',
    cursor: 'pointer',
  },
  buttonDiv: {
    padding: '10px 20px',
    margin: '5px',
    marginTop: '20px',
    backgroundColor: theme.palette.secondary.main,
    color: PRIMARY_COLOR,
    border: 'none',
    cursor: 'pointer',
  },
  buttonContainer: {
    textAlign: 'center',
  },
  modal: { padding: '20px' },
  primaryText: {
    color: PRIMARY_COLOR,
  },
}));

const AnalyticsHome = () => {
  const classes = useStyles();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const userGroups = useSelector(getUserGroups);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [userFound, setUserFound] = useState(false);
  const [userData, setUserData] = useState({});

  const [action, setAction] = useState('');
  const [actionContent, setActionContent] = useState('');
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [collection, setCollection] = useState('');
  const [module, setModule] = useState('');
  const [questionnaire, setQuestionnaire] = useState('');
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    setAction('');
    setCollection('');
    setModule('');
    setQuestionnaire('');
    setActionContent('');
    setActionError('');
    setActionModalOpen(false);
    setError('');
  }, [userData]);

  const handleSubmitCheck = (event: { preventDefault: () => void }) => {
    let username = userData['username'];
    let action_content = '';
    if (action === 'add_module' || action === 'remove_module') {
      if (module !== '') {
        action_content = userActionsList['modules'][module];
      }
    } else if (action === 'complete_questionnaire') {
      action_content = questionnaire;
    } else if (action === 'delete_user') {
      action_content = username;
    } else if (action === 'update_recipe_collection') {
      if (collection !== '') {
        action_content = userActionsList['collections'][collection];
      }
    }

    if (action_content !== '') {
      setActionContent(action_content);
      setActionModalOpen(true);
    }
  };

  const handleUserAction = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    let username = userData['username'];
    let action_content = '';
    if (action === 'add_module') {
      action_content = module;
    } else if (action === 'remove_module') {
      action_content = module;
    } else if (action === 'complete_questionnaire') {
      action_content = questionnaire;
    } else if (action === 'delete_user') {
      action_content = username;
    } else if (action === 'update_recipe_collection') {
      action_content = collection;
    }

    if (action_content !== '') {
      userActions(username, action, action_content)
        .then((res: any) => {
          if (res.data.status === true) {
            setActionError('User action performed successfully.');

            searchUser(searchTerm)
              .then((res: any) => {
                setUserFound(true);
                setUserData(res.data);
              })
              .catch((error) => {
                setUserFound(false);
                setUserData({});

                if (error.response.status === 403) {
                  setError(error.response.data.detail);
                } else {
                  setError(
                    'No user found with similar username, email address or code.'
                  );
                }
              });
          } else {
            setActionError('User action failed.');
          }
        })
        .catch((error) => {
          setActionError(error.response.data.detail);
        });
    } else {
      setActionError('No action item selected');
      setActionModalOpen(false);
    }
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (searchTerm === '') {
      setError('Please provide search term.');
      setUserFound(false);
      setUserData({});
      return;
    }

    searchUser(searchTerm)
      .then((res: any) => {
        setUserFound(true);
        setError('');
        setUserData(res.data);
      })
      .catch((error) => {
        setUserFound(false);
        setUserData({});

        if (error.response.status === 403) {
          setError(error.response.data.detail);
        } else {
          setError(
            'No user found with similar username, email address or code.'
          );
        }
      });
  };

  const transformActionTitle = (title: string) => {
    const titleWithSpaces = title.replace(/_/g, ' ');
    return titleWithSpaces.replace(/\b\w/g, (match) => match.toUpperCase());
  };

  if (
    !isAuthenticated ||
    !(
      userGroups.includes('care_panel_user_analytics') ||
      userGroups.includes('user_analytics') ||
      userGroups.includes('admin_user_analytics') ||
      userGroups.includes('care_panel_admin_analytics')
    )
  ) {
    return <Redirect to="/nutri/login" />;
  }

  return (
    <form className={classes.paper} onSubmit={handleSubmit}>
      <Avatar className={classes.avatar}>
        <AssessmentIcon />
      </Avatar>
      <h1>Analytics Dashboard</h1>
      <Paper className={classes.searchBarPaper}>
        <InputBase
          className={classes.inputBase}
          placeholder="Search User"
          inputProps={{ 'aria-label': 'search user' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IconButton
          type="button"
          aria-label="search"
          className={classes.iconBtn}
          onClick={handleSubmit}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <hr />
      {userFound &&
      (userGroups.includes('admin_user_analytics') ||
        userGroups.includes('care_panel_admin_analytics')) ? (
        <div className={classes.userActions}>
          <strong>User Action: </strong>
          <select
            onChange={(e) => {
              setAction(e.target.value);
            }}
            value={action}
            className={classes.select}
          >
            <option value="" className={classes.selectOption}>
              Select User Action
            </option>
            <option
              key="add_module"
              value="add_module"
              className={classes.selectOption}
            >
              Add Module
            </option>
            <option
              key="remove_module"
              value="remove_module"
              className={classes.selectOption}
            >
              Remove Module
            </option>
            <option
              key="complete_questionnaire"
              value="complete_questionnaire"
              className={classes.selectOption}
            >
              Complete Questionnaire
            </option>
            <option
              key="delete_user"
              value="delete_user"
              className={classes.selectOption}
            >
              Delete Account
            </option>
            <option
              key="update_recipe_collection"
              value="update_recipe_collection"
              className={classes.selectOption}
            >
              Update Recipe Collection
            </option>
          </select>

          {action === 'complete_questionnaire' ? (
            <select
              onChange={(e) => {
                setQuestionnaire(e.target.value);
              }}
              value={questionnaire}
              className={classes.select}
            >
              <option value="" className={classes.selectOption}>
                Select Questionnaire
              </option>
              {Object.entries(userData['questionnaires']).map(([slug]) => (
                <option
                  key={slug}
                  value={slug}
                  className={classes.selectOption}
                >
                  {slug}
                </option>
              ))}
            </select>
          ) : (
            ''
          )}

          {action === 'update_recipe_collection' ? (
            <select
              onChange={(e) => {
                setCollection(e.target.value);
              }}
              value={collection}
              className={classes.select}
            >
              <option value="" className={classes.selectOption}>
                Select Recipe Collection
              </option>
              <option key="1" value="1" className={classes.selectOption}>
                Gut-Friendly
              </option>
              <option key="2" value="2" className={classes.selectOption}>
                HB-Friendly
              </option>
              <option key="3" value="3" className={classes.selectOption}>
                Low-FODMAP
              </option>
              <option key="4" value="4" className={classes.selectOption}>
                Mediterranean-Diet
              </option>
              <option key="5" value="5" className={classes.selectOption}>
                IBD-Flareup
              </option>
              <option key="6" value="6" className={classes.selectOption}>
                HB-Weightloss
              </option>
            </select>
          ) : (
            ''
          )}

          {action === 'add_module' || action === 'remove_module' ? (
            <select
              onChange={(e) => {
                setModule(e.target.value);
              }}
              value={module}
              className={classes.select}
            >
              <option value="" className={classes.selectOption}>
                Select Module
              </option>
              <option key="2" value="2" className={classes.selectOption}>
                hypno
              </option>
              <option key="3" value="3" className={classes.selectOption}>
                cbt
              </option>
              <option key="1" value="1" className={classes.selectOption}>
                low-fodmap
              </option>
              <option key="21" value="21" className={classes.selectOption}>
                HB-weight-loss
              </option>
              <option key="22" value="22" className={classes.selectOption}>
                HB-weight-loss-hypnosis
              </option>
              <option key="14" value="14" className={classes.selectOption}>
                HB-Nutrition
              </option>
              <option key="18" value="18" className={classes.selectOption}>
                HB-Hypnosis-FD
              </option>
              <option key="17" value="17" className={classes.selectOption}>
                HB-Hypnosis-GERD
              </option>
              <option key="13" value="13" className={classes.selectOption}>
                HB-CBT
              </option>
              <option key="15" value="15" className={classes.selectOption}>
                HB-Relaxation
              </option>
              <option key="19" value="19" className={classes.selectOption}>
                IBD-PE
              </option>
              <option key="7" value="7" className={classes.selectOption}>
                IBD-Low-FODMAP
              </option>
              <option key="11" value="11" className={classes.selectOption}>
                IBD-Relaxation
              </option>
              <option key="10" value="10" className={classes.selectOption}>
                IBD-CBT
              </option>
              <option key="8" value="8" className={classes.selectOption}>
                IBD-MedDiet
              </option>
            </select>
          ) : (
            ''
          )}

          <Modal
            open={actionModalOpen}
            actions={
              <div className={classes.modal}>
                <Typography variant="h6" className={classes.primaryText}>
                  User Action: {transformActionTitle(action)} - {actionContent}
                </Typography>
                <Typography variant="subtitle1">
                  Are you sure you want to continue with this action.
                </Typography>
                <div className={classes.buttonContainer}>
                  <Button
                    color="primary"
                    type="button"
                    variant="contained"
                    className={classes.buttonDiv}
                    onClick={handleUserAction}
                  >
                    Submit
                  </Button>
                  <Button
                    className={classes.deleteButton}
                    onClick={() => setActionModalOpen(false)}
                  >
                    <Typography variant="subtitle2">Cancel</Typography>
                  </Button>
                </div>
              </div>
            }
          />

          {action !== '' ? (
            <Button
              color="primary"
              type="button"
              variant="contained"
              onClick={handleSubmitCheck}
            >
              Submit
            </Button>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
      {actionError && (
        <p className={classes.error}>
          <i>{actionError}</i>
        </p>
      )}
      <br />
      {error && (
        <p className={classes.error}>
          <i>{error}</i>
        </p>
      )}
      {userFound && <UserInfo userData={userData} />}
    </form>
  );
};

export default AnalyticsHome;
