import { Divider } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Spinner from '../../components/Spinner';
import { InboxContext } from '../contexts/InboxContext';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

import * as interfaces from '../interfaces';

import InboxItem from './InboxItem';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    overflowY: 'auto',
  },
  headerBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px 16px',
  },
  emptyInboxMessage: {
    textAlign: 'center',
    color: theme.palette.primary.main,
  },
  searchBar: {
    width: '80%',
    paddingLeft: '10px',
  },
}));

const Inbox = function () {
  const classes = useStyles();

  const rootRef = React.useRef<HTMLDivElement>(null);
  const loadMoreButtonRef = React.useRef<HTMLDivElement>(null);

  const history = useHistory();
  const { inboxSlug, roomId } = useParams();

  // the inbox selected from the sidebar to the very left
  const {
    loadedSlug,
    inboxItems,
    loadMoreInboxItems,
    searchInboxItems,
  } = React.useContext(InboxContext);

  // whether we are awaiting Kabelwerk's loadMore() function
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);

  // whether we have reached the bottom of the room list
  const [canLoadMore, setCanLoadMore] = React.useState(true);
  const [search, setSearch] = useState('');

  const handleSearch = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (search.length > 0) {
      searchInboxItems(search)
        .then((response: any) => {
          setIsLoadingMore(false);
          setCanLoadMore(false);
        })
        .catch((error: any) => {
          console.log('Error', error);
        });
    } else {
      setIsLoadingMore(false);
      setCanLoadMore(true);
    }
  };

  React.useEffect(() => {
    setIsLoadingMore(false);
    setCanLoadMore(true);
  }, [inboxItems]);

  const handleIntersect = function () {
    setIsLoadingMore(true);
    loadMoreInboxItems().then((hasMore) => {
      setIsLoadingMore(false);
      setCanLoadMore(hasMore);
    });
  };

  useIntersectionObserver({
    targetRef: loadMoreButtonRef,
    rootRef: rootRef,
    onIntersect: handleIntersect,
    threshold: 0.5,
    rootMargin: '16px',
    enabled: canLoadMore,
  });

  // open the first room if there is no room ID specified in the URL and the
  // inbox are not empty
  React.useEffect(() => {
    if (loadedSlug === inboxSlug && roomId === undefined && inboxItems.length) {
      const id = inboxItems[0].room.id;
      history.push(`/nutri/inbox/${inboxSlug}/${id}`);
    }
  }, [history, inboxSlug, roomId, loadedSlug, inboxItems]);

  return (
    <div ref={rootRef} className={classes.sidebar}>
      <div>
        <form onSubmit={handleSearch}>
          <Paper>
            <InputBase
              placeholder="Search User"
              className={classes.searchBar}
              inputProps={{ 'aria-label': 'search user' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <IconButton
              type="button"
              aria-label="search"
              onClick={handleSearch}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </form>
      </div>
      <Divider />
      {inboxItems.length === 0 ? (
        <p className={classes.emptyInboxMessage}>this inbox is empty</p>
      ) : (
        inboxItems.map((item: interfaces.InboxItem) => {
          return <InboxItem key={item.room.id} inboxItem={item} />;
        })
      )}
      {isLoadingMore ? (
        <Box
          px={2}
          py={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner size={24} noText />
        </Box>
      ) : (
        <div ref={loadMoreButtonRef} />
      )}
    </div>
  );
};

export default Inbox;
