export const constraints = {
  username: {
    presence: {
      allowEmpty: false,
      message: '^Please enter your username',
    },
    format: {
      pattern: '[a-z0-9]+',
      flags: 'i',
      message: 'can only contain a-z and 0-9',
    },
  },
  email: {
    presence: {
      allowEmpty: false,
      message: '^Please enter your email address',
    },
    email: {
      message: '^Please enter a valid email address',
    },
  },
  password: {
    presence: {
      allowEmpty: false,
      message: '^Please enter your password',
    },
    length: {
      minimum: 6,
      message: 'must be at least 6 characters',
    },
  },
};

export default constraints;
