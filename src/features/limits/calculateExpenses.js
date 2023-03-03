function calculateExpenses(operations) {
  const sum = operations.reduce((sum, operation) => (sum += +operation.amount), 0);

  return sum;
}

export { calculateExpenses };
