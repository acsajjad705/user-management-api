import morgan from 'morgan';

// Combined logging in development, tiny in production
const format = process.env.NODE_ENV === 'production' ? 'tiny' : 'dev';
export default morgan(format);
