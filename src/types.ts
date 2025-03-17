type TransferPartner = {
  name: string;
  bonus?: string;
  bonusUntil?: string;
  bonusPercent?: number;
  transferRatio?: string;
  alliance?: 'Star Alliance' | 'OneWorld' | 'SkyTeam';
  category: 'Airlines' | 'Hotels';
};

export type CreditCardProgram = {
  name: string;
  pointsName: string;
  source: string;
  partners: TransferPartner[];
};

import { SimulationNodeDatum, SimulationLinkDatum } from 'd3';

export interface Node extends SimulationNodeDatum {
  id: string;
  index?: number;
  x0?: number;
  x1?: number;
  y0?: number;
  y1?: number;
  category?: 'Airlines' | 'Banks' | 'Hotels';
}

export interface Link extends SimulationLinkDatum<Node> {
  source: number;
  target: number;
  value: number;
  width?: number;
}
