import React from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import ModalTitle from './ModalTitle';

interface CustomProps {
  title?: string;
  actions?: React.ReactNode;
}

type Props = CustomProps & DialogProps;

const Modal: React.FC<Props> = ({
  title,
  actions,
  onClose,
  children,
  ...rest
}) => (
  <Dialog onClose={onClose} {...rest}>
    {title && <ModalTitle onClose={onClose}>{title}</ModalTitle>}
    <DialogContent>{children}</DialogContent>
    {actions && <DialogActions>{actions}</DialogActions>}
  </Dialog>
);

export default Modal;
