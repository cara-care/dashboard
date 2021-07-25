export const INTERCOM_APP_ID = process.env.REACT_APP_INTERCOM_APP_ID;

export const LOCALES = [
  { code: 'en', locale: 'English' },
  { code: 'de', locale: 'Deutsch' },
];

export const getHost = () => {
  return process.env.NODE_ENV === 'production'
    ? 'https://web.gohidoc.com'
    : 'https://localhost:3000';
};

export const KABELWERK_URL = 'wss://eu-staging-chat.cara.care/socket/hub';
