import Kabelwerk from 'kabelwerk';
import React from 'react';

import { INBOXES, InboxType } from './inboxes';
import { Inbox, InboxItem } from './interfaces';

const InboxContext = React.createContext<{
  isReady: boolean;
  loadedSlug: string;
  inboxItems: InboxItem[];
  loadMoreInboxItems: () => Promise<boolean>;
}>({
  isReady: false,
  loadedSlug: '',
  inboxItems: [],
  loadMoreInboxItems: () => Promise.reject(),
});

const InboxProvider = function ({
  children,
  slug,
}: {
  children: any;
  slug: string;
}) {
  // the currently active inbox object
  const inbox = React.useRef<Inbox | null>(null);

  // whether the inbox ready event has been already fired
  const [isReady, setIsReady] = React.useState<boolean>(false);

  // the slug identifying the currently loaded inbox
  const [loadedSlug, setLoadedSlug] = React.useState<string>('');

  // the list of inbox items
  const [inboxItems, setInboxItems] = React.useState<InboxItem[]>([]);

  React.useEffect(() => {
    inbox.current = Kabelwerk.openInbox({
      limit: 20,
      attributes: INBOXES[slug].attributes,
      archived: INBOXES[slug].archived,
      assignedTo:
        slug === InboxType.PERSONAL ? Kabelwerk.getUser().id : undefined,
    });

    inbox.current!.on('ready', ({ items }: { items: InboxItem[] }) => {
      items = items.filter((item) => item.message !== null);

      setInboxItems(items);
      setIsReady(true);
      setLoadedSlug(slug);
    });

    inbox.current!.on('updated', ({ items }: { items: InboxItem[] }) => {
      items = items.filter((item) => item.message !== null);

      setInboxItems(items);
    });

    inbox.current!.connect();

    return () => {
      if (inbox.current) {
        inbox.current!.disconnect();
        inbox.current = null;
      }

      setIsReady(false);
      setLoadedSlug('');
      setInboxItems([]);
    };
  }, [slug]);

  const loadMoreInboxItems = function () {
    if (inbox.current) {
      return inbox
        .current!.loadMore()
        .then(({ items }: { items: InboxItem[] }) => {
          items = items.filter((item) => item.message !== null);

          if (items.length > inboxItems.length) {
            setInboxItems(items);
            return true;
          } else {
            return false;
          }
        })
        .catch((error: Error) => {
          console.error(error);
          return false;
        });
    } else {
      return Promise.resolve(false);
    }
  };

  return (
    <InboxContext.Provider
      value={{ isReady, loadedSlug, inboxItems, loadMoreInboxItems }}
    >
      {children}
    </InboxContext.Provider>
  );
};

export { InboxContext, InboxProvider };
