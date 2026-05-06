import { JwtModuleOptions } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

const JWTConfig = (): JwtModuleOptions => ({
  global: true,
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: '180d' },
});

export default JWTConfig;
