import * as React from 'react';
import { Body, Button, Container, Head, Heading, Hr, Html, Tailwind, Text, render } from 'jsx-email';

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
              Welcome to Acme Inc.
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              We&apos;re excited to have you on board. To get started, please verify your email address by clicking the
              button below:
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
              Verify Email
            </Button>
            <Text className="mt-4 text-[14px] leading-[24px] text-black">This link will expire in 24 hours.</Text>
            <Text className="mt-4 text-[14px] leading-[24px] text-black">
              If you didn&apos;t request this email, you can safely ignore it.
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
