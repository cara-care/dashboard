export const BACKEND_HOST =
  process.env.NODE_ENV === 'production'
    ? 'https://backend.gohidoc.com'
    : 'https://backend-staging.gohidoc.com';
export const INTERCOM_APP_ID = process.env.REACT_APP_INTERCOM_APP_ID;
