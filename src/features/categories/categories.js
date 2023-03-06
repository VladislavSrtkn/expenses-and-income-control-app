import { nanoid } from 'nanoid';

const categoriesData = [
  {
    name: 'Other income',
    color: '#88888b',
    type: 'income',
    visibility: true,
    limit: 0,
  },
  { name: 'Salary', color: '#4daf3c', type: 'income', visibility: true, limit: 0 },
  { name: 'Cashback', color: '#aa25e7', type: 'income', visibility: true, limit: 0 },
  {
    name: 'Interest on deposits',
    color: '#6966ca',
    type: 'income',
    visibility: true,
    limit: 0,
  },
  {
    name: 'Other expenses',
    color: '#88888b',
    type: 'expense',
    visibility: true,
    limit: 0,
  },
  {
    name: 'Supermarkets',
    color: '#f3b619',
    type: 'expense',
    visibility: true,
    limit: 0,
  },
  { name: 'Utilities', color: '#dd446c', type: 'expense', visibility: true, limit: 0 },
  { name: 'Clothes', color: '#058795', type: 'expense', visibility: true, limit: 0 },
  {
    name: 'Cafe and restaurants',
    color: '#22a9e7',
    type: 'expense',
    visibility: true,
    limit: 0,
  },
  { name: 'Travel', color: '#e7228c', type: 'expense', visibility: true, limit: 0 },
  { name: 'Rent', color: '#4e17e3a1', type: 'expense', visibility: true, limit: 0 },
];

const categories = {};

categoriesData.map((cat) => {
  const id = nanoid(15);
  categories[id] = { ...cat, id };
  return undefined;
});

export { categories };
