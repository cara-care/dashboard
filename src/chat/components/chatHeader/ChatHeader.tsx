import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { ChatUser, loadingCurrentUserSelector } from '../../redux';
import { zIndexes } from '../../../theme';
import { useSelector } from 'react-redux';
import { ChatHeaderSkeleton } from '../LoadingScreens';
import ChatHeaderLeftBox from './ChatHeaderLeftBox';
import ChatHeaderRightBox from './ChatHeaderRightBox';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'sticky',
    zIndex: zIndexes.chatHeader,
    left: 0,
    top: 0,
    backgroundColor: theme.palette.background.default,
    width: '100%',
    display: 'flex',
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: 12,
  },
}));

interface ChatHeaderProps {
  user: ChatUser;
  assignUserToNutri: (slug: string, room?: string) => void;
}

export default function ChatHeader({
  user,
  assignUserToNutri,
}: ChatHeaderProps) {
  const loadingUserData = useSelector(loadingCurrentUserSelector);
  const classes = useStyles();
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(96);

  useEffect(() => {
    if (ref.current?.clientHeight) {
      // minus margin and border
      setHeight(ref.current.clientHeight - 13);
    }
  }, [loadingUserData]);

  if (loadingUserData) {
    return (
      <Box className={classes.root}>
        <ChatHeaderSkeleton height={height} />
      </Box>
    );
  }

  return (
    <div ref={ref}>
      <Box className={classes.root}>
        <ChatHeaderLeftBox user={user} />
        <ChatHeaderRightBox assignUserToNutri={assignUserToNutri} />
      </Box>
    </div>
  );
}
