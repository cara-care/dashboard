import { useEffect, useState } from 'react';
import { getPrescriptions } from '../utils/api';
import { EpostStatus, PrescriptionsResponse } from './types';

const useSearchPrescriptions = ({
  initialStatus,
}: {
  initialStatus?: EpostStatus;
}) => {
  const [prescriptions, setPrescriptions] = useState<
    PrescriptionsResponse | undefined
  >(undefined);

  const fetchPrescriptions = async ({
    query,
    status,
    page,
    afterDate,
    beforeDate,
  }: {
    query?: string;
    status?: string;
    page?: number;
    afterDate?: string;
    beforeDate?: string;
  }) => {
    const response = await getPrescriptions({
      query,
      status,
      afterDate,
      beforeDate,
      page: page || 0,
    });
    setPrescriptions(response.data);
  };

  useEffect(() => {
    fetchPrescriptions({ status: initialStatus });
  }, [setPrescriptions, initialStatus]);

  return { prescriptions, fetchPrescriptions };
};

export default useSearchPrescriptions;
