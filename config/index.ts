/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import DatabaseConfig from './db.config';
import JWTConfig from './jwt.config';

interface Config {
  database: ReturnType<typeof DatabaseConfig>;
  jwt: ReturnType<typeof JWTConfig>;
}

export default (): Config => ({
  database: {
    ...DatabaseConfig(),
  },

  jwt: {
    ...JWTConfig(),
  },
});
