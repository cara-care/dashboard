import React from 'react';
import useAutoLogin from '../useAutoLogin';

const ResetPassword = () => {
  useAutoLogin();

  return (
    <div>
      <p>Reset Password</p>
    </div>
  );
};

export default ResetPassword;
