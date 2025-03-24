import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: Number(process.env.NODEMAILER_PORT),
  secure: process.env.NODEMAILER_SECURE === 'true',
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

type SendEmailProps = {
  to: string;
  subject: string;
  html: string;
};

export const sendEmail = async ({ to, subject, html }: SendEmailProps) => {
  const info = await transporter.sendMail({
    from: process.env.NODEMAILER_FROM,
    to,
    subject,
    html,
  });

  console.log('Message sent: %s', info.messageId);
};
