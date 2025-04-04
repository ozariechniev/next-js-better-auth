import { Body, Button, Container, Head, Heading, Hr, Html, Tailwind, Text, render } from 'jsx-email';

type DeleteAccountEmailProps = {
  url: string;
  userName: string;
};

export function DeleteAccountEmail({ url, userName }: DeleteAccountEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Account Deletion Request
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">Hi {userName},</Text>
            <Text className="text-[14px] leading-[24px] text-black">
              We have received a request to delete your account. If you did not make this request, you can safely ignore
              this email.
            </Text>
            <Button
              href={url}
              align="center"
              backgroundColor="#ff0000"
              borderRadius={5}
              textColor="#ffffff"
              width={135}
              height={40}
            >
              Delete Account
            </Button>
            <Text className="mt-4 text-[14px] leading-[24px] text-black">This link will expire in 24 hours.</Text>
            <Text className="mt-4 text-[14px] leading-[24px] text-black">
              If you need any further assistance, please contact our support team.
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              Best regards,
              <br />
              Acme Inc.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export async function deleteAccountEmailHTML(props: DeleteAccountEmailProps) {
  return await render(<DeleteAccountEmail {...props} />);
}
