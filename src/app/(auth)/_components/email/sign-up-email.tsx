import * as React from 'react';
import { Body, Button, Container, Head, Heading, Hr, Html, Tailwind, Text, render } from '@react-email/components';

type SignUpEmailProps = {
  url: string;
};

export function SignUpEmail({ url }: SignUpEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Hello, welcome to Acme Inc.
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              We&apos;re excited to have you on board. To get started, please verify your email address by clicking the
              button below:
            </Text>
            <Button
              className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
              href={url}
            >
              Verify My Email
            </Button>
            <Text className="mt-4 text-[14px] leading-[24px] text-black">
              This link will expire in 24 hours. If you didn&apos;t request this email, you can safely ignore it.
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              Didn&apos;t create an account with Acme Inc? Someone might have entered your email by mistake. If you
              didn&apos;t initiate this request, no further action is required.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export async function signUpEmailHTML({ url }: SignUpEmailProps) {
  return await render(<SignUpEmail url={url} />);
}
