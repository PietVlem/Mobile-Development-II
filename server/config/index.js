if (process.env.NODE_ENV === 'development') {
    module.exports = {
      JWT_SECRET: 'MOBDEV_TWIEE',
      oauth: {
        google: {
          clientID: 'number',
          clientSecret: 'string',
        },
        facebook: {
          clientID: 'number',
          clientSecret: 'string',
        },
      },
    };
  } else {
    module.exports = {
      JWT_SECRET: '',
      oauth: {
        google: {
          clientID: '',
          clientSecret: '',
        },
        facebook: {
          clientID: '',
          clientSecret: '',
        },
      },
    };
  }