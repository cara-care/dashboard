import { INTERCOM_APP_ID } from './constants';

const getIntercomLink = (email: string) => {
  return `https://app.intercom.io/apps/${INTERCOM_APP_ID}/users/show?email=${encodeURIComponent(
    email
  )}`;
};

export default getIntercomLink;
