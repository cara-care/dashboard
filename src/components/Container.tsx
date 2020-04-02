import React from 'react';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

interface Props {
  className?: string;
}

const Container: React.FC<Props> = ({ className, ...rest }) => {
  const classes = useStyles();
  return <div className={cx(classes.root, className)} {...rest} />;
};

export default Container;
