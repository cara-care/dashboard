import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { hasPatientId, SelectPatient } from '../auth';
import NutriNavigation from './NutriNavigation';

interface CheckPatientWrapperProps {
  children: ReactElement | ReactElement[];
  route: string;
}

const CheckPatientWrapper = ({ children, route }: CheckPatientWrapperProps) => {
  const isPatientSelected = useSelector(hasPatientId);

  if (!isPatientSelected) {
    return (
      <>
        <NutriNavigation />
        <SelectPatient route={route} />
      </>
    );
  }

  return <>{children}</>;
};

export default CheckPatientWrapper;
