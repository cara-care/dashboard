import React, { useState, useCallback } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps,
} from 'react-intl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {
  isSelectingPatient,
  hasError,
  isAuthenticated as isAuthenticatedSelector,
} from '../authReducer';
import { selectPatientInitAction, resetErrorAction } from '../authActions';
import AuthLayout from '../components/AuthLayout';
import Modal from '../../components/Modal';
import getIntercomLink from '../../utils/getIntercomLink';

interface Props extends WrappedComponentProps {
  route?: string;
}

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const SelectPatient: React.FC<Props> = ({
  intl,
  route = '/nutri/programs',
}) => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const isFetching = useSelector(isSelectingPatient);
  const isErrorDialogOpen = useSelector(hasError);
  const selectPatient = useCallback(
    (email, history, route) => {
      dispatch(selectPatientInitAction(email, history, route));
    },
    [dispatch]
  );
  const closeErrorDialog = useCallback(() => {
    dispatch(resetErrorAction());
  }, [dispatch]);
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value.trim());
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    selectPatient(email, history, route);
  };

  if (!isAuthenticated) {
    return <Redirect to="/nutri/login" />;
  }

  return (
    <>
      <AuthLayout>
        <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            name="email"
            label={intl.formatMessage({
              id: 'nutri.selectPatient.label',
            })}
            margin="normal"
            required
            fullWidth
            onChange={onChangeEmail}
          />
          <Button
            disabled={isFetching}
            className={classes.submit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            <FormattedMessage id="nutri.selectPatient.button" />
          </Button>
        </form>
      </AuthLayout>
      <Modal
        open={isErrorDialogOpen}
        onClose={closeErrorDialog}
        title={intl.formatMessage({
          id: 'nutriMenu.selectPatient.errorTitle',
        })}
        actions={
          <Button onClick={closeErrorDialog}>
            <FormattedMessage id="general.close" />
          </Button>
        }
      >
        <Typography>
          <FormattedMessage id="nutriMenu.selectPatient.errorMsgBeforeLink" />{' '}
          <a
            className={classes.link}
            target="_blank"
            rel="nofollow noreferrer noopener"
            href={getIntercomLink(email)}
          >
            <FormattedMessage id="nutriMenu.selectPatient.errorMsgLink" />
          </a>{' '}
          <FormattedMessage id="nutriMenu.selectPatient.errorMsgAfterLink" />
        </Typography>
      </Modal>
    </>
  );
};

export default injectIntl(SelectPatient);
