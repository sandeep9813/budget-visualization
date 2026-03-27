// Mock data for the government budget application

export const budgetData2024 = [
  { name: 'Education', value: 125, color: 'hsl(215, 84%, 35%)' },
  { name: 'Healthcare', value: 98, color: 'hsl(142, 76%, 36%)' },
  { name: 'Defense', value: 156, color: 'hsl(38, 92%, 50%)' },
  { name: 'Infrastructure', value: 87, color: 'hsl(0, 84%, 60%)' },
  { name: 'Social Services', value: 65, color: 'hsl(215, 84%, 55%)' },
  { name: 'Environment', value: 43, color: 'hsl(142, 60%, 50%)' },
];

export const budgetComparison = [
  { name: '2020', value: 480 },
  { name: '2021', value: 520 },
  { name: '2022', value: 545 },
  { name: '2023', value: 598 },
  { name: '2024', value: 674 },
];

export const provincialData = {
  'Province A': [
    { name: 'Education', value: 45 },
    { name: 'Healthcare', value: 38 },
    { name: 'Infrastructure', value: 28 },
    { name: 'Social Services', value: 22 },
  ],
  'Province B': [
    { name: 'Education', value: 52 },
    { name: 'Healthcare', value: 41 },
    { name: 'Infrastructure', value: 35 },
    { name: 'Social Services', value: 28 },
  ],
  'Province C': [
    { name: 'Education', value: 28 },
    { name: 'Healthcare', value: 19 },
    { name: 'Infrastructure', value: 24 },
    { name: 'Social Services', value: 15 },
  ],
};

export const feedbackData = [
  {
    id: 1,
    username: 'citizen01',
    year: 2024,
    sector: 'Education',
    province: 'Province A',
    message: 'More funding needed for rural schools and teacher training programs.',
    timestamp: '2024-01-15T10:30:00Z',
    upvotes: 24,
    category: 'underfunded'
  },
  {
    id: 2,
    username: 'taxpayer99',
    year: 2024,
    sector: 'Healthcare',
    province: 'Province B',
    message: 'Emergency services are understaffed. Need more ambulances and medical equipment.',
    timestamp: '2024-01-18T14:45:00Z',
    upvotes: 18,
    category: 'infrastructure'
  },
  {
    id: 3,
    username: 'concerned_parent',
    year: 2024,
    sector: 'Education',
    province: 'Province C',
    message: 'School buildings need major repairs. Safety is a concern for our children.',
    timestamp: '2024-01-20T09:15:00Z',
    upvotes: 31,
    category: 'infrastructure'
  },
];

export const totalBudget2024 = budgetData2024.reduce((sum, item) => sum + item.value, 0);