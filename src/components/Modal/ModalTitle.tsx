import React from 'react';
import DialogTitle, { DialogTitleProps } from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {
  withStyles,
  Theme,
  WithStyles,
  StyleRules,
} from '@material-ui/core/styles';

const styles = (theme: Theme): StyleRules => ({
  title: {
    paddingRight: theme.spacing(6),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(),
    top: theme.spacing(),
    color: theme.palette.grey[500],
  },
});

interface CustomProps {
  onClose?: (
    event: React.SyntheticEvent,
    reason: 'backdropClick' | 'escapeKeyDown'
  ) => void;
}

type Props = CustomProps & DialogTitleProps & WithStyles<typeof styles>;

const ModalTitle: React.FC<Props> = ({
  onClose,
  children,
  classes,
  ...rest
}) => {
  const handleClose = (e: React.SyntheticEvent) => {
    if (onClose) {
      onClose(e, 'backdropClick');
    }
  };

  return (
    <DialogTitle disableTypography {...rest}>
      <Typography variant="h6" className={classes.title}>
        {children}
      </Typography>
      {onClose && (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      )}
    </DialogTitle>
  );
};

export default withStyles(styles)(ModalTitle);
