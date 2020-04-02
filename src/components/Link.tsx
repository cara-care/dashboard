import React from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import MUILink, { LinkProps } from '@material-ui/core/Link';
import { Omit } from '@material-ui/types';

// The use of React.forwardRef will no longer be required for react-router-dom v6.
// See https://github.com/ReactTraining/react-router/issues/6056
const RouterLinkWithPropForwarding = React.forwardRef<
  HTMLAnchorElement,
  RouterLinkProps
>((props, ref) => <RouterLink innerRef={ref} {...props} />);

const Link: React.FC<
  Omit<LinkProps, 'component'> & Omit<RouterLinkProps, 'innerRef'>
> = (props) => <MUILink {...props} component={RouterLinkWithPropForwarding} />;

export default Link;
