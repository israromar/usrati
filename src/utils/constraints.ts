export const constraints = {
  username: {
    presence: {
      allowEmpty: false,
      message: '^Please enter username',
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
      message: '^Please enter email address',
    },
    email: {
      message: '^Please enter a valid email address',
    },
  },
  password: {
    presence: {
      allowEmpty: false,
      message: '^Please enter password',
    },
    length: {
      minimum: 6,
      message: 'must be at least 6 characters',
    },
  },
  name: {
    presence: {
      allowEmpty: false,
      message: '^Please enter child name',
    },
    format: {
      pattern: '[a-z ]+',
      flags: 'i',
      message: 'can only contain a-z',
    },
  },
  schoolName: {
    presence: {
      allowEmpty: false,
      message: '^Please enter school name',
    },
    format: {
      pattern: '[a-z0-9 ]+',
      flags: 'i',
      message: 'can only contain a-z and 0-9',
    },
  },
  interest: {
    presence: {
      allowEmpty: false,
      message: '^Please enter child insterests',
    },
    format: {
      pattern: '[a-z0-9 ]+',
      flags: 'i',
      message: 'can only contain a-z and 0-9',
    },
  },
  matricTitle: {
    presence: {
      allowEmpty: false,
      message: '^Please enter title',
    },
    // format: {
    //   pattern: '[a-z]+',
    //   flags: 'i',
    //   message: 'can only contain a-z',
    // },
  },
  matricWeightage: {
    presence: {
      allowEmpty: false,
      message: '^Please enter weightage',
    },
    // format: {
    //   pattern: '[a-z]+',
    //   flags: 'i',
    //   message: 'can only contain a-z',
    // },
  },
  matricDescription: {
    presence: {
      allowEmpty: false,
      message: '^Please enter description',
    },
    // format: {
    //   pattern: '[a-z0-9]+',
    //   flags: 'i',
    //   message: 'can only contain a-z and 0-9',
    // },
  },
};

export default constraints;
