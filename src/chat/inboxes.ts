export const INBOXES = {
  personal: {
    name: 'Assigned to me',
    icon: '💚',
    attributes: {},
    archived: false,
  },
  anwendertest_hb: {
    name: 'Anwendertest HB',
    icon: '🐿️',
    attributes: { in_anwendertest_hb: true },
    archived: false,
  },
  anwendertest_ibd: {
    name: 'Anwendertest IBD',
    icon: '🦩',
    attributes: { in_anwendertest_ibd: true },
    archived: false,
  },
  anwendertest_ibs: {
    name: 'Anwendertest IBS',
    icon: '🐢',
    attributes: { in_anwendertest_ibs: true },
    archived: false,
  },
  rct_ibs: {
    name: 'RCT IBS',
    icon: '🌵',
    attributes: { in_rct_ibs: true },
    archived: false,
  },
  no_study: {
    name: 'Not in a study',
    icon: '⭐',
    attributes: {
      in_anwendertest_hb: false,
      in_anwendertest_ibd: false,
      in_anwendertest_ibs: false,
      in_rct_ibs: false,
    },
    archived: false,
  },
  all: {
    name: 'All',
    icon: '🌍',
    attributes: {},
    archived: false,
  },
  archived: {
    name: 'Archived',
    icon: '🗂️',
    attributes: {},
    archived: true,
  },
};
