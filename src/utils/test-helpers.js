export const NOT_FOUND_TEXT_ID = 'not-found-text';
export const EXPORT_TOKEN_INVALID = 'export-token-invalid';
export const TRACKING_OVERVIEW_DATEPICKER = 'tracking-overview-datepicker';
export const LANGUAGE_MENU_BUTTON = 'language-menu-button';
export const QUESTIONNAIRE_NAME = 'questionnaire-name';
export const DARK_MODE_ICON = 'dark-mode-icon';
export const LIGHT_MODE_ICON = 'light-mode-icon';
export const NUTRI_NAVIGATION = 'nutri-navigation';
export const CHAT_WRAPPER = 'chat-wrapper';
export const MESSAGE_CONTAINER = 'message-container';
export const CHAT_MESSAGE_INPUT = 'chat-message-input';

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
