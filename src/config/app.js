module.exports = {
  cors_options: {
    origin: '*', // Allow all domains
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400 // 24 hours
  },
  request_limit_size: '1mb',
  strong_password: { // Validator
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
    returnScore: false,
  }
}
