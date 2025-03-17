import { useQuery } from '@tanstack/react-query';
import { transferPartners } from '@/data/transferPartners';
import type { CreditCardProgram } from '@/types';

const fetchTransferPartners = async (): Promise<CreditCardProgram[]> => {
  await new Promise((resolve) => setTimeout(resolve, 0));
  return transferPartners;
};

export const useTransferPartners = () => {
  return useQuery({
    queryKey: ['transferPartners'],
    queryFn: fetchTransferPartners,
  });
};
