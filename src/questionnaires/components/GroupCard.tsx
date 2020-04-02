import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
  withStyles,
  WithStyles,
  Theme,
  StyleRules,
} from '@material-ui/core/styles';
import Field, { FieldTypes } from './Field';

const styles = (theme: Theme): StyleRules => ({
  card: {
    padding: theme.spacing(2),
    height: '100%',
    boxShadow: '0 2px 13px 0 rgba(0,0,0,0.10)',
  },
  heading: {
    marginBottom: theme.spacing(2),
  },
  link: {
    margin: `${theme.spacing(1)}px 0`,
    display: 'flex',
    alignfields: 'center',
    justifyContent: 'space-between',
    color: 'inherit',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  disabledLink: {
    cursor: 'not-allowed',
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  listfield: {
    marginBottom: theme.spacing(2),
    whiteSpace: 'pre-wrap',
  },
});

interface OwnProps {
  name: string;
  fields: {
    id: string;
    name: string;
    type: FieldTypes;
    value: any;
  }[];
}

type Props = OwnProps & WithStyles<typeof styles>;

const GroupCard: React.FC<Props> = ({ classes, name, fields }) => {
  return (
    <Paper elevation={0} className={classes.card}>
      <Typography variant="h6" className={classes.heading}>
        {name}
      </Typography>
      <ul className={classes.list}>
        {fields.map((field) => (
          <li key={field.id} className={classes.listfield}>
            {/* heading */}
            <Typography variant="subtitle2">{field.name}</Typography>
            {/* body */}
            <Field type={field.type} value={field.value} />
          </li>
        ))}
      </ul>
    </Paper>
  );
};

export default withStyles(styles)(GroupCard);
