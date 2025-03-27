import { CreditCardProgram } from '@/types';

export const transferPartners: CreditCardProgram[] = [
  {
    name: 'American Express',
    pointsName: 'Membership Rewards',
    source: '/amex.svg',
    partners: [
      {
        name: 'Aer Lingus AerClub',
        category: 'Airlines',
        transferRatio: '1:1',
      },
      {
        name: 'Aeromexico Club Premier',
        category: 'Airlines',
        alliance: 'SkyTeam',
        transferRatio: '1:1.6',
      },
      {
        name: 'Air Canada Aeroplan',
        category: 'Airlines',
        alliance: 'Star Alliance',
        transferRatio: '1:1',
      },
      {
        name: 'Air France/KLM Flying Blue',
        category: 'Airlines',
        alliance: 'SkyTeam',

        transferRatio: '1:1',
      },
      {
        name: 'ANA Mileage Club',
        category: 'Airlines',
        alliance: 'Star Alliance',

        transferRatio: '1:1',
      },
      {
        name: 'Avianca LifeMiles',
        category: 'Airlines',
        alliance: 'Star Alliance',

        transferRatio: '1:1',
      },
      {
        name: 'British Airways Executive Club',
        category: 'Airlines',
        alliance: 'OneWorld',

        transferRatio: '1:1',
      },
      {
        name: 'Cathay Pacific Asia Miles',
        category: 'Airlines',
        alliance: 'OneWorld',

        transferRatio: '1:1',
      },
      {
        name: 'Delta SkyMiles',
        category: 'Airlines',
        alliance: 'SkyTeam',

        transferRatio: '1:1',
      },
      {
        name: 'Emirates Skywards',
        category: 'Airlines',
        transferRatio: '1:1',
      },
      {
        name: 'Etihad Guest',
        category: 'Airlines',
        transferRatio: '1:1',
      },
      {
        name: 'HawaiianMiles (Alaska Airlines)',
        category: 'Airlines',
        alliance: 'OneWorld',
        transferRatio: '1:1',
      },
      {
        name: 'Iberia Plus',
        category: 'Airlines',
        alliance: 'OneWorld',

        transferRatio: '1:1',
      },
      {
        name: 'JetBlue TrueBlue',
        category: 'Airlines',
        transferRatio: '5:4',
      },
      {
        name: 'Qantas Frequent Flyer',
        category: 'Airlines',
        alliance: 'OneWorld',

        transferRatio: '1:1',
      },
      {
        name: 'Qatar Airways Privilege Club',
        bonus: '1:1.2',
        bonusPercent: 20,
        alliance: 'OneWorld',

        bonusUntil: '2025-03-31',
        category: 'Airlines',
        transferRatio: '1:1',
      },
      {
        name: 'Singapore Airlines KrisFlyer',
        category: 'Airlines',
        alliance: 'Star Alliance',
        transferRatio: '1:1',
      },
      {
        name: 'Virgin Atlantic Flying Club',
        category: 'Airlines',
        alliance: 'SkyTeam',

        transferRatio: '1:1',
      },
      {
        name: 'Choice Privileges',
        category: 'Hotels',
        transferRatio: '1:1',
      },
      {
        name: 'Hilton Honors',
        category: 'Hotels',
        transferRatio: '1:2',
      },
      {
        name: 'Marriott Bonvoy',
        category: 'Hotels',
        transferRatio: '1:1',
      },
    ],
  },
  {
    name: 'Chase',
    pointsName: 'Ultimate Rewards',
    source: '/chase.png',
    partners: [
      {
        name: 'Aer Lingus AerClub',
        category: 'Airlines',
        bonus: '1:1.2',
        bonusPercent: 20,
        bonusUntil: '2025-03-31',
        transferRatio: '1:1',
      },
      {
        name: 'Air Canada Aeroplan',
        category: 'Airlines',
        alliance: 'Star Alliance',
        transferRatio: '1:1',
      },

      {
        name: 'Air France/KLM Flying Blue',
        category: 'Airlines',
        alliance: 'SkyTeam',

        transferRatio: '1:1',
      },
      {
        name: 'British Airways Executive Club',
        category: 'Airlines',
        alliance: 'OneWorld',

        transferRatio: '1:1',
        bonus: '1:1.2',
        bonusPercent: 20,
        bonusUntil: '2025-03-31',
      },
      {
        name: 'Emirates Skywards',
        category: 'Airlines',
        transferRatio: '1:1',
      },
      {
        name: 'Iberia Plus',
        category: 'Airlines',
        bonus: '1:1.2',
        bonusPercent: 20,
        bonusUntil: '2025-03-31',
        transferRatio: '1:1',
      },
      {
        name: 'JetBlue TrueBlue',
        category: 'Airlines',
        transferRatio: '1:1',
      },
      {
        name: 'Singapore Airlines KrisFlyer',
        category: 'Airlines',
        alliance: 'Star Alliance',

        transferRatio: '1:1',
      },
      {
        name: 'Southwest Airlines Rapid Rewards',
        category: 'Airlines',
        transferRatio: '1:1',
      },
      {
        name: 'United MileagePlus',
        category: 'Airlines',
        alliance: 'Star Alliance',

        transferRatio: '1:1',
      },
      {
        name: 'Virgin Atlantic Flying Club',
        category: 'Airlines',
        alliance: 'SkyTeam',

        transferRatio: '1:1',
      },
      {
        name: 'IHG One Rewards',
        category: 'Hotels',
        transferRatio: '1:1',
      },
      {
        name: 'Marriott Bonvoy',
        category: 'Hotels',
        transferRatio: '1:1',
        bonus: '1:1.5',
        bonusPercent: 50,
        bonusUntil: '2025-03-31',
      },
      {
        name: 'World of Hyatt',
        category: 'Hotels',
        transferRatio: '1:1',
      },
    ],
  },
  {
    name: 'Capital One',
    pointsName: 'Venture Miles',
    source: '/cap1.png',
    partners: [
      {
        name: 'Aeromexico Club Premier',
        category: 'Airlines',
        alliance: 'SkyTeam',

        transferRatio: '1:1',
      },
      {
        name: 'Air Canada Aeroplan',
        category: 'Airlines',
        alliance: 'Star Alliance',

        transferRatio: '1:1',
      },
      {
        name: 'Avianca LifeMiles',
        category: 'Airlines',
        alliance: 'Star Alliance',

        transferRatio: '1:1',
      },
      {
        name: 'British Airways Executive Club',
        category: 'Airlines',
        alliance: 'OneWorld',
        transferRatio: '1:1',
      },
      {
        name: 'Cathay Pacific Asia Miles',
        alliance: 'OneWorld',
        category: 'Airlines',
        transferRatio: '1:1',
      },
      {
        name: 'Emirates Skywards',
        category: 'Airlines',
        transferRatio: '1:1',
      },
      {
        name: 'Etihad Guest',
        bonus: '1:1.4',
        bonusPercent: 40,
        bonusUntil: '2025-03-31',
        category: 'Airlines',
        transferRatio: '1:1',
      },
      {
        name: 'EVA Air Infinity MileageLands',
        alliance: 'Star Alliance',

        category: 'Airlines',
        transferRatio: '2:1.5',
      },
      {
        name: 'Finnair Plus',
        category: 'Airlines',
        transferRatio: '1:1',
        alliance: 'OneWorld',
      },
      {
        name: 'Air France/KLM Flying Blue',
        category: 'Airlines',
        alliance: 'SkyTeam',

        transferRatio: '1:1',
      },
      {
        name: 'JetBlue TrueBlue',
        category: 'Airlines',
        transferRatio: '5:3',
      },
      {
        name: 'Qantas Frequent Flyer',
        category: 'Airlines',
        alliance: 'OneWorld',
        transferRatio: '1:1',
      },
      {
        name: 'Singapore Airlines KrisFlyer',
        alliance: 'Star Alliance',

        category: 'Airlines',
        transferRatio: '1:1',
      },
      {
        name: 'TAP Miles&Go',
        alliance: 'Star Alliance',

        category: 'Airlines',
        transferRatio: '1:1',
      },
      {
        name: 'Turkish Airlines Miles&Smiles',
        category: 'Airlines',
        alliance: 'Star Alliance',

        transferRatio: '1:1',
      },
      {
        name: 'Virgin Red',
        category: 'Airlines',
        alliance: 'SkyTeam',

        transferRatio: '1:1',
      },
      {
        name: 'ALL - Accor Live Limitless',
        category: 'Hotels',
        transferRatio: '2:1',
      },
      {
        name: 'Choice Privileges',
        category: 'Hotels',
        transferRatio: '1:1',
      },
      {
        name: 'Wyndham Rewards',
        category: 'Hotels',
        transferRatio: '1:1',
      },
    ],
  },
  {
    name: 'Bilt',
    pointsName: 'BILT Rewards',
    warning:
      "BILT sometimes has 'Rent Day' transfer bonuses lasting for a month, typically announced in the last week of the month prior.  Depending on your BILT tier (Blue, Silver, Gold, or Platinum) you will be awarded a diferent transfer bonus for that day.",
    source: '/BILT.png',
    partners: [
      {
        name: 'Aer Lingus AerClub',
        category: 'Airlines',
        transferRatio: '1:1',
        bonusUntil: 'Whole Month of April',

        bonus:
          '1:1.5 for Blue, 1:1.6 for Silver, 1:1.75 for Gold, 1:2 for Platinum',
      },
      {
        name: 'Air Canada Aeroplan',
        category: 'Airlines',
        transferRatio: '1:1',
        alliance: 'Star Alliance',
      },
      {
        name: 'Air France/KLM Flying Blue',
        category: 'Airlines',
        alliance: 'SkyTeam',
        transferRatio: '1:1',
      },
      {
        name: 'Alaska Airlines',
        category: 'Airlines',
        alliance: 'OneWorld',

        transferRatio: '1:1',
      },
      {
        name: 'Avianca LifeMiles',
        category: 'Airlines',
        transferRatio: '1:1',
        alliance: 'Star Alliance',
      },
      {
        name: 'British Airways Executive Club',
        category: 'Airlines',
        alliance: 'OneWorld',
        bonusUntil: 'Whole Month of April',

        bonus:
          '1:1.5 for Blue, 1:1.6 for Silver, 1:1.75 for Gold, 1:2 for Platinum',

        transferRatio: '1:1',
      },
      {
        name: 'Cathay Pacific Asia Miles',
        category: 'Airlines',
        alliance: 'OneWorld',

        transferRatio: '1:1',
      },
      {
        name: 'Emirates Skywards',
        category: 'Airlines',
        transferRatio: '1:1',
      },
      {
        name: 'Iberia Plus',
        category: 'Airlines',
        alliance: 'OneWorld',
        bonus:
          '1:1.5 for Blue, 1:1.6 for Silver, 1:1.75 for Gold, 1:2 for Platinum',
        bonusUntil: 'Whole Month of April',

        transferRatio: '1:1',
      },
      {
        name: 'TAP Miles&Go',
        category: 'Airlines',
        alliance: 'Star Alliance',

        transferRatio: '1:1',
      },
      {
        name: 'Turkish Airlines Miles&Smiles',
        category: 'Airlines',
        alliance: 'Star Alliance',

        transferRatio: '1:1',
      },
      {
        name: 'United MileagePlus',
        category: 'Airlines',
        transferRatio: '1:1',
        alliance: 'Star Alliance',
      },
      {
        name: 'Virgin Red',
        category: 'Airlines',
        alliance: 'SkyTeam',

        transferRatio: '1:1',
      },
      {
        name: 'ALL - Accor Live Limitless',
        category: 'Hotels',
        transferRatio: '3:2',
      },
      {
        name: 'Hilton Honors',
        category: 'Hotels',
        transferRatio: '1:1',
      },
      {
        name: 'IHG One Rewards',
        category: 'Hotels',
        transferRatio: '1:1',
      },
      {
        name: 'Marriott Bonvoy',
        category: 'Hotels',
        transferRatio: '1:1',
      },
      {
        name: 'World of Hyatt',
        category: 'Hotels',
        transferRatio: '1:1',
      },
    ],
  },
  {
    name: 'Citi',
    pointsName: 'ThankYou Points',
    source: '/citi.svg',
    warning:
      'These rates are assuming you have a Citi Strata Premier or Citi Prestige card.  Other Citi cards earning ThankYou Points transfer to Choice at 1:1.5, Wyndham at 1:0.8, and Jetblue at 1:0.8',
    partners: [
      {
        name: 'Aeromexico Club Premier',
        category: 'Airlines',
        alliance: 'SkyTeam',

        transferRatio: '1:1',
      },
      {
        name: 'Air France/KLM Flying Blue',
        category: 'Airlines',
        alliance: 'SkyTeam',

        transferRatio: '1:1',
      },
      {
        name: 'Avianca LifeMiles',
        category: 'Airlines',
        bonus: '1:1.25',
        bonusPercent: 25,
        bonusUntil: '2025-04-12',
        alliance: 'Star Alliance',
        transferRatio: '1:1',
      },
      {
        name: 'Cathay Pacific Asia Miles',
        category: 'Airlines',
        alliance: 'OneWorld',

        transferRatio: '1:1',
      },
      {
        name: 'Emirates Skywards',
        category: 'Airlines',
        transferRatio: '1:1',
      },
      {
        name: 'Etihad Guest',
        category: 'Airlines',
        transferRatio: '1:1',
      },
      {
        name: 'EVA Air Infinity MileageLands',
        category: 'Airlines',
        alliance: 'Star Alliance',

        transferRatio: '1:1',
      },
      {
        name: 'JetBlue TrueBlue',
        category: 'Airlines',
        transferRatio: '1:1',
      },
      {
        name: 'Qantas Frequent Flyer',
        category: 'Airlines',
        alliance: 'OneWorld',

        transferRatio: '1:1',
      },
      {
        name: 'Qatar Airways Privilege Club',
        category: 'Airlines',
        transferRatio: '1:1',
        alliance: 'OneWorld',
      },
      {
        name: 'Singapore Airlines KrisFlyer',
        category: 'Airlines',
        alliance: 'Star Alliance',

        transferRatio: '1:1',
      },
      {
        name: 'Thai Airways Royal Orchid Plus',
        category: 'Airlines',
        alliance: 'Star Alliance',

        transferRatio: '1:1',
      },
      {
        name: 'Turkish Airlines Miles&Smiles',
        category: 'Airlines',
        alliance: 'Star Alliance',

        transferRatio: '1:1',
      },
      {
        name: 'Virgin Atlantic Flying Club',
        category: 'Airlines',
        alliance: 'SkyTeam',

        transferRatio: '1:1',
      },
      {
        name: 'Choice Privileges',
        category: 'Hotels',
        transferRatio: '1:2',
      },
      {
        name: 'Wyndham Rewards',
        category: 'Hotels',
        transferRatio: '1:1',
      },
      {
        name: 'ALL - Accor Live Limitless',
        category: 'Hotels',
        transferRatio: '2:1',
      },
      {
        name: 'Leaders Club',
        category: 'Hotels',
        transferRatio: '5:1',
      },
      {
        name: 'Preferred Hotels & Resorts',
        category: 'Hotels',
        transferRatio: '1:4',
      },
    ],
  },
];
