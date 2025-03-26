import * as React from 'react';
import { Body, Button, Container, Head, Heading, Hr, Html, Tailwind, Text, render } from 'jsx-email';

type ResetPasswordEmailProps = {
  url: string;
  userEmail?: string;
};

export function ResetPasswordEmail({ url, userEmail }: ResetPasswordEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Reset your password to Acme Inc.
            </Heading>

            {userEmail && (
              <Text className="text-[14px] leading-[24px] text-black">
                We received a request to reset the password for your account ({userEmail}).
              </Text>
            )}

            <Text className="mt-4 text-[14px] leading-[24px] text-black">
              To reset your password, please click the button below:
            </Text>

            <Button
              href={url}
              align="center"
              backgroundColor="#000000"
              borderRadius={5}
              textColor="#ffffff"
              width={135}
              height={40}
            >
              Reset Password
            </Button>

            <Text className="mt-4 text-[14px] leading-[24px] text-black">
              This password reset link will expire in 1 hour. If you didn&apos;t request a password reset, please ignore
              this email or contact support if you have concerns.
            </Text>

            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />

            <Text className="text-[12px] leading-[24px] text-[#666666]">
              If you didn&apos;t request this change, we recommend securing your account by changing your password
              immediately after logging in.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export async function resetPasswordEmailHTML({ url, userEmail }: ResetPasswordEmailProps) {
  return await render(<ResetPasswordEmail url={url} userEmail={userEmail} />);
}
