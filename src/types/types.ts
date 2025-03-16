type TransferPartner = {
  name: string;
  transferRatio?: string;
  category: 'Airlines' | 'Hotels';
};

export type CreditCardProgram = {
  name: string;
  pointsName: string;
  partners: TransferPartner[];
};
