export const passwordRule =
  'Password must be at least 8 characters and include one lowercase letter, one uppercase letter, and one digit.';

export const isStrongPassword = (password) => {
  return (
    typeof password === 'string' &&
    password.length >= 8 &&
    password.length <= 100 &&
    !!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/)
  );
};
