import * as nodemailer from 'nodemailer';

export const createEmailTransporter = () => {
  const email = process.env.SMTP_EMAIL;
  const password = process.env.SMTP_PASSWORD;

  if (!email || !password) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: email,
      pass: password,
    },
  });
};
