const getIntercomLink = (email: string) => {
  return `https://app.intercom.io/apps/${
    process.env.REACT_APP_INTERCOM_APP_ID
  }/users/show?email=${encodeURIComponent(email)}`;
};

export default getIntercomLink;
