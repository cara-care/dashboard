import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { v1 } from 'uuid';
import GetApp from '@material-ui/icons/GetApp';
import { formatDate } from '../../utils/dateUtils';
import { useIntl } from 'react-intl';

export enum FieldTypes {
  char = 'char',
  date = 'date',
  file = 'file',
  integer = 'integer',
  multiple_choice = 'multiple_choice',
  scale = 'scale',
  single_choice = 'single_choice',
  text = 'text',
  info = 'info',
}

interface Props {
  type: FieldTypes;
  value: any;
}

const useStyles = makeStyles((theme) => ({
  link: {
    margin: `${theme.spacing(1)}px 0`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'inherit',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  disabledLink: {
    cursor: 'not-allowed',
  },
}));

const Field: React.FC<Props> = ({ type, value }) => {
  const classes = useStyles();
  const { locale } = useIntl();

  switch (type) {
    case FieldTypes.char:
    case FieldTypes.text:
    case FieldTypes.info:
      return <Typography variant="body2">{value || '-'}</Typography>;
    case FieldTypes.integer:
    case FieldTypes.scale:
      return (
        <Typography variant="body2">{value === null ? '-' : value}</Typography>
      );
    case FieldTypes.single_choice:
      return (
        <Typography variant="body2">
          {value === null ? '-' : value.label}
        </Typography>
      );
    case FieldTypes.multiple_choice:
      return (
        <>
          {Array.isArray(value) ? (
            value.map((val: { id: string; label: string }) => (
              <Typography key={val.id ? val.id : v1()} variant="body2">
                {val.label !== null ? val.label : '-'}
              </Typography>
            ))
          ) : typeof value === 'string' ? (
            <Typography variant="body2">{value}</Typography>
          ) : (
            <Typography variant="body2">{'-'}</Typography>
          )}
        </>
      );
    case FieldTypes.date:
      return (
        <Typography variant="body2">
          {value ? formatDate(value, 'P', locale) : '-'}
        </Typography>
      );
    case FieldTypes.file:
      return (
        <>
          {value ? (
            value.map((val: any) => (
              <a
                key={val.id}
                href={process.env.REACT_APP_URL + '/api' + val.url}
                target="_blank"
                rel="nofollow noreferrer noopener"
                className={classes.link}
              >
                <Typography variant="subtitle2">{val.name}</Typography>
                <GetApp color="primary" />
              </a>
            ))
          ) : (
            <Typography variant="body2">-</Typography>
          )}
        </>
      );
    default:
      return <Typography variant="body2">{value}</Typography>;
  }
};

export default Field;
