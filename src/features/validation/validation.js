export function validateAmount(amount) {
  if (isNaN(amount) || amount <= 0) {
    return false;
  }
  return true;
}

export function validateCategory(category) {
  if (category === '') {
    return false;
  }
  return true;
}

export function checkIsNameInvalid(input, names) {
  if (input === '' || input.length > 20) {
    return 'Please enter a name (max 20 characters)';
  }
  if (names.includes(input)) {
    return 'A category with this name already exists';
  }
  return false;
}
