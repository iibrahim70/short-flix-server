import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export const env = {
  // Server
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  corsOrigin:
    process.env.CORS_ORIGIN?.split(',').map((origin) => origin.trim()) || [],

  // Database
  dbURL: process.env.DATABASE_URL,
  dbName: process.env.DB_NAME,

  // Super Admin
  superAdminName: process.env.SUPER_ADMIN_NAME,
  superAdminEmail: process.env.SUPER_ADMIN_EMAIL,
  superAdminPassword: process.env.SUPER_ADMIN_PASSWORD,
  superAdminRole: process.env.SUPER_ADMIN_ROLE,

  // Security & JWT
  bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS,
  jwtPassResetSecret: process.env.JWT_PASS_RESET_SECRET,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  jwtPassResetExpiresIn: process.env.JWT_PASS_RESET_EXPIRES_IN,
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,

  // SMTP
  smtpEmailUser: process.env.SMTP_EMAIL_USER,
  smtpEmailPass: process.env.SMTP_EMAIL_PASS,

  // Cloudinary
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
};
