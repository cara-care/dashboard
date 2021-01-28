import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

interface ExternalLinkProps {
  children: JSX.Element | JSX.Element[] | string;
  href: string;
}

const ExternalLink = ({ children, href }: ExternalLinkProps) => {
  const classes = useStyles();
  return (
    <a
      className={classes.link}
      target="_blank"
      rel="nofollow noreferrer noopener"
      href={href}
    >
      {children}
    </a>
  );
};

export default ExternalLink;
