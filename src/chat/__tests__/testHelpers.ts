export const currentUserMock = {
  age: 20,
  allergies: ['Allergy1', 'Allergy2', 'Allergy3'],
  dateJoined: '2020-12-21',
  diagnosis: ':Food intolerance/allergy',
  email: 'test@email.com',
  enrolledProgrammes: [],
  id: 832624,
  inbox: 'test',
  lastSeen: '2020-12-22',
  nickname: 'test',
  platform: 'Android',
  sex: 'male',
  timezone: 'Europe/Warsaw',
  username: 'auto-lcWollvQTegJsckadasadoK1',
};

export const testMessage = 'Hi this is test message!';

export const chatMessagesMock = [
  {
    author: 'bart',
    created: '2021-01-14T08:28:05Z',
    id: 1454,
    sent: '2021-01-14T08:28:05Z',
    text: 'hi',
    upload: null,
  },
  {
    author: 'auto-8e9CqEDkDrPsFUaqO78I',
    created: '2021-01-14T08:15:07Z',
    id: 1453,
    sent: '2021-01-14T08:15:07Z',
    text: 'HI',
    upload: null,
  },
];

export const chatRoomsMock = [
  {
    lastMessage: {
      author: 'auto-Bue9Ku8zbZNS41RXGZPo',
      created: '2021-01-15T08:30:46Z',
      id: 1457,
      sent: '2021-01-15T08:30:46Z',
      text: 'Hi Test',
      upload: null,
    },
    patient: { id: 101010, username: 'test-user', nickname: 'Tester' },
  },
  {
    lastMessage: {
      author: 'auto-Bue9Ku8zbZNS41RXG999',
      created: '2021-01-15T08:40:46Z',
      id: 1458,
      sent: '2021-01-15T08:40:46Z',
      text: 'Hi Test2',
      upload: null,
    },
    patient: { id: 202020, username: 'test-user2', nickname: 'Tester2' },
  },
];

export const chatConversationsMock = [
  { name: 'Unknown', private: false, slug: 'unknown', count: 0 },
  { name: 'All', private: false, slug: 'all', count: 0 },
  {
    name: 'Test Nutri',
    private: false,
    slug: 'test-nutri',
    count: 0,
  },
];

export const notesMock = [
  {
    author: { id: 832625, name: 'Test Nutri' },
    created: '2021-02-22T15:57:00.441726Z',
    id: 1000,
    lastModified: '2021-02-22T15:57:00.441756Z',
    text: 'note1',
  },
  {
    author: { id: 832620, name: 'Test Nutri2' },
    created: '2021-02-22T15:57:02.794563Z',
    id: 1001,
    lastModified: '2021-02-22T15:57:02.794601Z',
    text: 'note2',
  },
  {
    author: { id: 832626, name: 'Test Nutri3' },
    created: '2021-02-22T15:57:02.794563Z',
    id: 1002,
    lastModified: '2021-02-22T15:57:02.794601Z',
    text: 'note3',
  },
];
