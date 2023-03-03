function calculateLimitPercentage(limit, expenses) {
  const percent = Math.round((expenses / limit) * 100);

  return percent;
}

export { calculateLimitPercentage };
