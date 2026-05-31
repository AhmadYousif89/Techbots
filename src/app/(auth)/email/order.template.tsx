import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "react-email";

export type EmailRecipient = {
  email: string;
  username?: string | null;
  imageUrl?: string | null;
};

type Props = {
  user: EmailRecipient;
  url: string;
};

const logoSrc = process.env.NEXT_PUBLIC_LOGO_URL;

export const OrderDetailsTemplate = ({ user, url }: Props) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Your order is ready in your account!</Preview>
      <Container style={container}>
        {logoSrc ? (
          <div style={image}>
            <Img
              src={logoSrc}
              alt="Techbots"
              width={214}
              height={"auto"}
              style={{ display: "block" }}
            />
          </div>
        ) : null}
        <Text style={paragraph}>Hi {user.username || "there"},</Text>
        <Section style={btnContainer}>
          <Button
            style={button}
            href={url}
            rel="noopener noreferrer"
            target="_blank"
          >
            View your orders
          </Button>
        </Section>
        <Text style={paragraph}>
          Your payment was confirmed and the order has been saved to your
          account.
        </Text>
        <Text style={paragraph}>
          Best,
          <br />
          Techbots Team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          This email was sent to {user.email}. If you did not create an account,
          please ignore.
        </Text>
        <Text style={footer}>© 2026 Techbots. All rights reserved.</Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "32px",
  backgroundColor: "#FFF",
};

const image = { backgroundColor: "#ffffff", width: "fit-content" };

const paragraph = {
  fontSize: "14px",
  lineHeight: "22px",
};

const btnContainer = {
  display: "flex",
  textAlign: "center" as const,
};

const button = {
  width: "fit-content",
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
